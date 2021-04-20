import React,{Component} from 'react';
import {View,Text,TextComponent,TextInput,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class SettingScreen extends Component{
  constructor(){
    super()
    this.state={
      emailID:'',
      first_name:'',
      last_name:'',
      address:'',
      contact:'',
      docID:''
    }
  }

  getUserDetails(){
    var user = firebase.auth().currentUser
    var email = user.email

    db.collection('users').where('emailId','==',email).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        var data = doc.data()
        console.log(data)
        this.setState({
          emailID:data.emailId,
          first_name:data.first_name,
          last_name:data.last_name,
          address:data.address,
          contact:data.contact,
          docID:doc.id
        })
      })
    })
  }

  updateUserDetails=()=>{
    db.collection('users').doc(this.state.docID)
    .update({
      'first_name':this.state.first_name,
      'last_name':this.state.last_name,
      'address':this.state.address,
      'contact':this.state.contact
    })
    Alert.alert('Profile Updated Successfully!')
  }

  componentDidMount(){
    this.getUserDetails()
  }

  render(){
    return(
      <View >
        <MyHeader title='Settings' navigation={this.props.navigaton}/>
        <View style={styles.formContainer}>
          <TextInput
                style = {styles.formTextInput}
                placeholder='First Name'
                maxLength={8}
                onChangeText={(text)=>{
                  this.setState({
                    first_name:text
                  })
                }}
                value={this.state.first_name}
              />
              <TextInput
                style = {styles.formTextInput}
                placeholder='Last Name'
                maxLength={8}
                onChangeText={(text)=>{
                  this.setState({
                    last_name:text
                  })
                }}
                value={this.state.last_name}
              />
              <TextInput
                style = {styles.formTextInput}
                placeholder='Contact'
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact:text
                  })
                }}
                value={this.state.contact}
              />
              <TextInput
                style = {styles.formTextInput}
                placeholder='Address'
                multiline={true}
                onChangeText={(text)=>{
                  this.setState({
                    address:text
                  })
                }}
                value={this.state.address}
              />
              <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                this.updateUserDetails()
              }}>
              <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer:{
    flex:1,
    width:'100%',
    alignItems: 'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
  },
  buttonText:{
    fontSize:25,
    fontWeight:"bold",
    color:"#fff"
  }
})