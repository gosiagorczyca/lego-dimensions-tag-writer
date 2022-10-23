import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

type Page = {
  35: string;
  36: string;
  37: string;
  38: string;
  43: string;
  pwd: number;
};

type Crypto = {
  encrypted: string;
  pages: Page;
};

const url = 'https://ldcharcrypto.ags131.com/api/ld';

const App = () => {
  const [log, setLog] = useState('Ready...');
  const [text, setText] = useState('');
  const [newData, setNewData] = useState<Crypto | undefined>();

  useEffect(() => {
    NfcManager.start();

    return () => _cleanUp();
  }, []);

  const getNewData = (uid: string) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: text, uid}),
    };
    fetch(url, requestOptions)
      .then(res => res.json())
      .then((data: Crypto) => {
        setNewData(data);
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const readData = async () => {
    try {
      let reqMifare = await NfcManager.requestTechnology(NfcTech.NfcA);

      console.log(reqMifare);

      // 1. Get NFC Tag information
      const nfcTag = await NfcManager.getTag();

      const uid = nfcTag?.id;

      if (uid) {
        getNewData(uid);
      }

      // 3. Success
      console.log('[NFC Read] [INFO] Success reading Mifare');

      // 4. Cleanup
      _cleanUp();
    } catch (ex) {
      console.warn('[NFC Read] [ERR] Failed Reading Mifare: ', ex);
      _cleanUp();
    }
  };

  const writeData = async () => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;

      if (!newData) {
        return;
      }

      const page35 = newData.pages[35]
        .match(/.{1,2}/g)
        ?.map(s => parseInt(`0x${s}`.replace(/^#/, ''), 16));
      const page36 = newData.pages[36]
        .match(/.{1,2}/g)
        ?.map(s => parseInt(`0x${s}`.replace(/^#/, ''), 16));
      const page37 = newData.pages[37]
        .match(/.{1,2}/g)
        ?.map(s => parseInt(`0x${s}`.replace(/^#/, ''), 16));
      const page38 = newData.pages[38]
        .match(/.{1,2}/g)
        ?.map(s => parseInt(`0x${s}`.replace(/^#/, ''), 16));
      const page43 = newData.pages[43]
        .match(/.{1,2}/g)
        ?.map(s => parseInt(`0x${s}`.replace(/^#/, ''), 16));

      await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });

      if (page35 && page36 && page37 && page38 && page43) {
        //35
        await NfcManager.nfcAHandler.transceive([0xa2, 0x23, ...page35]);

        //36
        await NfcManager.nfcAHandler.transceive([0xa2, 0x24, ...page36]);

        //37
        await NfcManager.nfcAHandler.transceive([0xa2, 0x25, ...page37]);

        //38
        await NfcManager.nfcAHandler.transceive([0xa2, 0x26, ...page38]);

        //43
        await NfcManager.nfcAHandler.transceive([0xa2, 0x2b, ...page43]);
      }

      _cleanUp();
    } catch (ex) {
      setLog(ex.toString());
      _cleanUp();
    }
  };

  const onChangeText = text => {
    setText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#888888"
        placeholder="Enter character/vehicle ID"
      />

      <TouchableOpacity style={styles.buttonWrite} onPress={writeData}>
        <Text style={styles.buttonText}>Write</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!text.length}
        style={styles.buttonRead}
        onPress={readData}>
        <Text style={styles.buttonText}>Read</Text>
      </TouchableOpacity>

      <View style={styles.log}>
        <Text>{log}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    color: 'black',
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'lightpink',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#ffffff',
  },
  log: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
