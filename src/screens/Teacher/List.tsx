import React, { Component } from 'react'
import ProfileCardComponent from '../../components/ProfileCardComponent'
import SearchBarComponents from '../../components/SearchBarComponent'
import PTRView from 'react-native-pull-to-refresh'
import EmptyListMessage from '../../components/EmptyListMessageComponent'
import { Container, Content, Root,  Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { teachers, searchTeachers } from '../../actions/teacher-list-actions'
import { STYLES } from '../../style';
//import AdminModel from '../../models/admin-model'

interface ListProps {
  navigation : any,
  teachers: () => void,
  loading: boolean,
  error: any,
  //list: Array<AdminModel>
  list: Array<any>

  searchTeachers: (search: string) => void,
  loadingSearch: boolean,
  errorSearch: any,
  //list: Array<AdminModel>
  listSearch: Array<any>,
}

interface ListState {
  filterAcvive: boolean,
  teacherList: Array<any>
}

export class List extends Component<ListProps, ListState> {

  state = {
    filterAcvive: false,
    teacherList: []
  }

   componentDidMount = () => {
    console.log('didMouunt')
    this.props.teachers()
    console.log('esta es mi super lista' + this.props.list)
   }

  //  componentDidUpdate = () => {
  //   console.log('qwertyuiop' + JSON.stringify(this.props.list))
  //  }

  filterList = (text : string) => {
    if(text.length > 1){
      console.log(text)
      this.setState({
        filterAcvive: true
      });
      this.props.searchTeachers(text)
      //this.props.list = this
    }     
    if(text.length == 0){
      this.refreshList()
      this.setState({
        filterAcvive: false
      });
    }    
  }

  refreshList = () => {
    console.log('refresh list')
    this.props.teachers()
    this.setState({
      filterAcvive: false
    });
  } 

  goToOthersProfile = (name : string) => {
    const { navigate } = this.props.navigation
    navigate('othersProfile', {name: name})
  }

  renderList = () => {
    let textMessage = this.state.filterAcvive ?  'No matching Administrators' : 'There are no Admins'
    let adminsList = this.state.filterAcvive  ? this.props.listSearch : this.props.list
    
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
          number = { p.numberSponsees }
          type =  'sponsees'
          role = 'teacher'
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
            {this.renderList()}
            </Content>
          </Container>
        </Root>
      </PTRView>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
      loading: state.teacherListReducer.loading,
      list: state.teacherListReducer.example,
      error: state.teacherListReducer.error,

      loadingSearch: state.teacherSearchReducer.loading,
      listSearch: state.teacherSearchReducer.example,
      errorSearch: state.teacherSearchReducer.error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    teachers: () => dispatch(teachers()),
    searchTeachers: ( search: string) => dispatch(searchTeachers(search)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)