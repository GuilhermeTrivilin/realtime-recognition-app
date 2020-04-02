import React, { Component, Fragment } from 'react';
import { RNCamera } from 'react-native-camera';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    ScrollView,
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';


const Scan = (props) => {
    const { camera, cameraResult, clickAgain, takePicture, activeCamera, googleVisionDetetion, loading } = props
    const desccription = 'Bem vindo ao aplicativo de reconhecimento de imagens, o mesmo foi desenvolvido com o único intuito de aprendizado.'
    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.textTitle}>Reconhecimento de imagem com Google Vision</Text>
                {!camera && !cameraResult &&
                    <View style={styles.cardView} >
                        <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>

                        <TouchableOpacity onPress={activeCamera} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Vamos lá!</Text>
                        </TouchableOpacity>

                    </View>
                }
                {!googleVisionDetetion && loading &&
                    <View style={styles.SpinnerStyle}>
                        <ActivityIndicator size={props.size || 'large'} />
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Pesquisando no banco de dados do Google Vision API</Text>
                    </View>
                }
                {/* When Google Vision returns response successfully */}
                {googleVisionDetetion &&
                    <Fragment>
                        <Text style={styles.textTitle1}>Resultados:</Text>

                        <View style={googleVisionDetetion ? styles.scanCardView : styles.cardView} >
                            <ScrollView>

                                {googleVisionDetetion.webDetection.webEntities.map((data, index) => {
                                    return (
                                        <View key={index} style={{ borderWidth: 2, borderColor: 'black', margin: 10 }}>
                                            <Text>entityId : {data.entityId}</Text>
                                            <Text>score : {data.score}</Text>
                                            <Text numberOfLines={1}>description: {data.description}</Text>
                                        </View>

                                    )
                                })
                                }
                            </ScrollView>
                        </View>

                        <TouchableOpacity onPress={clickAgain} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Escanear novamente</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {/* React Native camera View */}
                {camera &&
                    <View style={styles.container}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.off}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            androidRecordAudioPermissionOptions={{
                                title: 'Permission to use audio recording',
                                message: 'We need your permission to use your audio',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                console.log(barcodes);
                            }}
                        />
                        <View style={{
                            flex: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            position: 'absolute',
                            left: Dimensions.get('window').width * 0.25,
                            bottom: 0
                        }}>
                            <TouchableOpacity onPress={() => takePicture(this.camera)} style={styles.capture}>
                                <Text style={{ fontSize: 14 }}> CAPTURAR FOTO </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </Fragment>
        </View>

    );

}



export default Scan;