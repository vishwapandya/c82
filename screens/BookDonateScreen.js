import React,{Component} from 'react';
import {Text,View,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';


export default class BookDonateScreen extends React.Component{

  constructor(){
    super()
    this.state={
      requestedBookList:[]
    }
    this.requestRef = null
  }

  getRequestedBookList=()=>{
    this.requestRef = db.collection('requested_books')
    .onSnapshot((snapshot)=>{
      var requestedBookList = snapshot.docs.map(document=>document.data());
       console.log(requestedBookList)
      this.setState({
        requestedBookList:requestedBookList
      })
    })
    
  }

  componentDidMount(){
    this.getRequestedBookList()
   
  }

  componentWillUnmount(){
    this.requestRef()
  }

  keyExtractor = (item,index) => index.toString()

  renderItem=({item,i})=>{
    return(
      
      <ListItem
        key={i}
        title = {item.book_name}
        subtitle = {item.reason_to_request}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
          <TouchableOpacity style={styles.button}
          onPress={()=>{
            this.props.navigation.navigate('ReceiverDetails',{'details':item})
          }}>
            <Text style={{color:'#ffffff'}}>VIEW</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title='Donate Books'/>
        <View style={{flex:1}}>
          {
            this.state.requestedBookList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style ={{fonstSize:20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                style={{marginTop:-170}}
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBookList}
                renderItem={this.renderItem}
              />
            )
          }
          
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
