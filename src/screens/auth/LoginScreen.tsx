

import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/Button';

import { users } from '../../helpers/users';
import { useForm } from '../../hooks/useForm';
import { getJWT } from '../../helpers/jwt';



interface Props extends StackScreenProps<any, any> { }

export default function LoginScreen({ navigation }: Props) {


    const { handleOnChange, form } = useForm({

        email: '',
        password: '',

    });


    const handelLogin = async (emailU: string, passwordU: string) => {



        if (emailU === users.email && passwordU === users.password) {

            getJWT(users.id).then((tok) => {

                users.token = tok


                if (users.token !== '') {

                    navigation.navigate('HomeStack')

                } else {
                    navigation.navigate('AuthStack');

                }
            });

        } else {

            Alert.alert(

                'Login',
                'Los datos son incorrectos'

            );
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: '#EEEEEE' }}
        >
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>


                    <View style={styles.formContainer}  >

                        <Image
                            style={styles.image}
                            source={(require('../../assets/images/picachu.png'))}
                        />

                        <Text style={styles.textForm} >Iniciar sesión</Text>

                        <TextInput
                            placeholder='Correo electronico'
                            style={styles.input}
                            onChangeText={(value) => handleOnChange(value, 'email')}
                            keyboardType='email-address'

                        />
                        <TextInput
                            placeholder='Contraseña'
                            style={styles.input}
                            onChangeText={(value) => handleOnChange(value, 'password')}
                            autoCorrect={false}
                            secureTextEntry={true}
                        />

                        <Button
                            title='Ingresar'
                            onPress={() => handelLogin(form.email, form.password)}
                        />

                        <View style={{ height: 250 }} />
                    </View>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: '#EEEEEE',
        height: 250,
    },
    formContainer: {

        alignItems: 'center',
        marginTop: 230,
        flex: 1,
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    image: {
        height: 150,
        width: 150,
        top: -142,
        left: 129,
        position: 'absolute'
    },
    textForm: {
        marginTop: 65,
        marginBottom: 35,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
        borderColor: 'rgba(0,0,0,0.3)',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '90%',
    },

});

