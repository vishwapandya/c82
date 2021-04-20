import React,{Component} from 'react';
import {Text,View,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReceiverDetailScreen extends React.Component{
  constructor(){
    super()
    this.state={
      userID:firebase.auth().currentUser.email,
      receiverID:this.props.navigation.getParam('details')['user_ID'],
      requestID:this.props.navigation.getParam('details')['request_ID'],
      bookName:this.props.navigation.getParam('details')['bookName'],
      reason_for_requesting:this.props.navigation.getParam('details')['reason_to_request'],
      receiverName:'',
      receiverContact:'',
      receiverAddress:'',
      receiverRequestDocID:''
    }
  }

  getReceiverDetails =()=>{
    db.collection('users').where('emailID','==',this.state.receiverID).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          receiverName:doc.data().first_name,
          receiverContact:doc.data().contact,
          receiverAddress:doc.data().address,
        })
      })
    })
  }

  updateBookStatus=()=>{
    db.collection('all_donations').add({
      book_name:this.state.bookName,
      request_ID:this.state.requestID,
      requested_by:this.state.receiverName,
      donor_ID:this.state.userID,
      request_status:'Donor Interested!'
    })
  }

  render(){
    return(
      <View>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBookStatus()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})


