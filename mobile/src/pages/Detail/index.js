import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com R$${incident.value}`

    function navigateBack(){
        navigation.goBack();
    };

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,

        });
    };

    function sendWhatsapp(){
        { Linking.openURL(`whatsapp://send?text=${message}&phone=${55+incident.whatsapp}`)}
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e02041' />
                </TouchableOpacity>
            </View>

            <ScrollView >

                <View style={styles.incident}>       

                    {/* é possivel criar um array de estilos, até com o fim de sobrescrever alguma propriedade da folha de estilos */}
                    <Text style={[ styles.incidentProperty, { marginTop:0 } ]}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{
                    Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL'
                    }).format(incident.value)}
                    </Text>         

                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>

                        <TouchableOpacity style={styles.action} onPress={ sendWhatsapp }>
                            <Text style={styles.actionText}> WhatsApp </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={ sendEmail }>
                            <Text style={styles.actionText}> E-mail </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>
            
        </View>    
    );

}