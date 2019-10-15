import React, { Component } from 'react'
import ProfileCardComponent from '../../components/ProfileCardComponent'
import SearchBarComponents from '../../components/SearchBarComponent'
import PTRView from 'react-native-pull-to-refresh'
import EmptyListMessage from '../../components/EmptyListMessageComponent'
import { Container, Content, Root,  Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { admins, searchAdmins } from '../../actions/admin-list-actions'
import { STYLES } from '../../style';


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
  filterActive: boolean,
  adminsList: Array<any>
}

export class List extends Component<ListProps, ListState> {

  state = {
    filterActive: false,
    adminsList: []
  }
  
   componentDidMount = () => {
    this.props.admins()
   }

  filterList = (text : string) => {
    if(text.length > 1){
      console.log(text)
      this.setState({
        filterActive: true
      });
      this.props.searchAdmins(text)
    }     
    if(text.length == 0){
      this.refreshList()
      this.setState({
        filterActive: false
      });
    }    
  }

  refreshList = () => {
    console.log('refresh list')
    this.props.admins()
    this.setState({
      filterActive: false
    });
  } 

  goToOthersProfile = (name : string) => {
    const { navigate } = this.props.navigation
    navigate('othersProfile', {name: name})
  }

  renderList = () => {
    let textMessage = this.state.filterActive ?  'No matching Administrators' : 'There are no Admins'
    let adminsList = this.state.filterActive  ? this.props.listSearch : this.props.list

    if (adminsList.length == 0) {
      return (
        <EmptyListMessage
          text = {textMessage}
        />
      )
    }
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
    return list;
  }

  render() {
    return (
      <PTRView onRefresh={this.refreshList}>
        <Root>
          <Container>
            <Content padder>
            <SearchBarComponents 
              callback={this.filterList}
            />
            <Button style={STYLES.button}>
              <Text style={STYLES.textButton}>
                Create New
              </Text>
            </Button>
            <Text>{JSON.stringify(this.props.list)}</Text>
            {() => this.renderList()}
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
