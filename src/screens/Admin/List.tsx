import React, { Component } from 'react'
import ProfileCardComponent from '../../components/ProfileCardComponent'
import SearchBarComponents from '../../components/SearchBarComponent'
import PTRView from 'react-native-pull-to-refresh'
import EmptyListMessage from '../../components/EmptyListMessageComponent'
import { Container, Content, Root,  Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { admins, searchAdmins } from '../../actions/admin-list-actions'
import { STYLES } from '../../style';
import { NavigationEvents } from "react-navigation";


interface ListProps {
  navigation : any,
  admins: () => void,
  loading: boolean,
  error: any,
  list: Array<any>,

  searchAdmins: (search: string) => void,
  loadingSearch: boolean,
  errorSearch: any,
  listSearch: Array<any>,

}

interface ListState {
  filterActive: boolean
  admins: Array<any>
  message: any
  search: string
}

export class List extends Component<ListProps, ListState> {
  constructor(props : ListProps){
    super(props)
    console.log("entra a const")
  }

  state = {
    filterActive: false,
    admins: [],
    message: Component,
    search: '',
  }
  
   componentWillMount = () => {
    this.props.admins()
    
    console.log("entra a willm")
   }

  componentWillReceiveProps = () => {
   
    this.renderList()
    console.log("entra a willrec")
  }
  filterList = (text : string) => {
    console.log("text: "+text)
    this.setState({
      search: text
    })
    text = text.replace(/ /g, "")
    console.log('here comes the boom')
    if(text.length < 2){
      
      console.log('shouldbehere')
      this.setState({
        filterActive: false
      },
      () => this.props.admins());
      
    }     
    else{
      console.log(text)
      this.setState({
        filterActive: true
      });
      this.props.searchAdmins(text)
    }    
  }

  refreshList = () => {
    this.setState({
      filterActive: false,
      search: ''
    }),
    () => this.props.admins();
  } 

  goToOthersProfile = (name : string) => {
    const { navigate } = this.props.navigation
    navigate('othersProfile', {name: name})
  }

  renderList = () => {
    console.log(this.state.filterActive)
    console.log(this.props.listSearch)
    console.log(this.props.list)
    this.setState({
      admins: [],
      message: <></>
    })
    let textMessage = this.state.filterActive ?  'No matching Administrators' : 'There are no Admins'
    let adminsList: Array<any> = this.state.filterActive  ? this.props.listSearch : this.props.list

    console.log(typeof this.props.listSearch === 'undefined')
    console.log('ya pto '+ (this.props.listSearch.length < 1))


    if(this.state.filterActive && (typeof this.props.listSearch === 'undefined' || this.props.listSearch.length < 1))
      this.setState({
        message: <EmptyListMessage text = 'No matching Administrators'/>
      })
    if(!this.state.filterActive && (typeof this.props.list === 'undefined' || this.props.list.length < 1))
      this.setState({
        message: <EmptyListMessage text ='There are no Admins' />
      })

    if ((typeof adminsList.length !== 'undefined')) {
       
        
      const list = adminsList.map( p => {
        return (
          <ProfileCardComponent
            id = { p.id }
            first_name = { p.first_name }
            last_name ={ p.last_name }
            number = { p.numSponsees }
            type =  'sponsees'
            role = 'admin'
            profile_picture = { p.profile_picture }
            last_signed = { p.last_signed }
            onClick = {() => this.goToOthersProfile(p.first_name) }
          />
        );
      });
    
      this.setState({
        admins: list,
        message: <></>
      })

      
    }
  }
  
  render() {
    console.log("entra a ren")
    return (
      
      <PTRView onRefresh={this.refreshList}>
        <NavigationEvents
          onWillFocus={() => {
            this.props.admins().then(

            )
            this.setState({
              filterActive: false,
              admins: [],
              message: Component,
            })
          }}
        />
        <Root>
          <Container>
            <Content padder>
            <SearchBarComponents 
              setText={this.state.search}
              callback={this.filterList}
            />
            <Button style={STYLES.button}>
              <Text style={STYLES.textButton}>
                Create New
              </Text>
            </Button>
            {this.props.list && this.refreshList()}
            {this.state.admins}
            {this.state.message}
            </Content>
          </Container>
        </Root>
      </PTRView>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    
      loading: state.adminListReducer.aloading,
      list: state.adminListReducer.admins,
      error: state.adminListReducer.aerror,

      loadingSearch: state.adminSearchReducer.aloading,
      listSearch: state.adminSearchReducer.admins,
      errorSearch: state.adminSearchReducer.aerror
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchAdmins: ( search: string) => dispatch(searchAdmins(search)),
    admins: () => dispatch(admins())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
