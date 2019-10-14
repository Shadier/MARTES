import React, { Component } from 'react'
import { FlatList } from 'react-native'
import ProfileCardComponent from '../../components/ProfileCardComponent'
import SearchBarComponents from '../../components/SearchBarComponent'
import PTRView from 'react-native-pull-to-refresh'
import { Container, Content, Root,  Button, Text,  ActionSheet } from 'native-base'
import { STYLES } from '../../style';


interface ListProps {
  navigation : any
}
export default class List extends Component<ListProps, {}> {
  

  state = {
    adminsList: [
      {  
        id: 'ef488930-eae7-11e9-81b4-2a2ae2dbcce4',
        first_name: 'Ana Maria ',
        last_name: 'Angulo',
        number: 22,
        type: 'Sponsees',
        role: 'Admin',
        profile_picture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        last_signed: 'Active: 10.07.19 @ 6pm'
      },
      { 
        id: ' ef488b9c-eae7-11e9-81b4-2a2ae2dbcce4',
        first_name: 'Miguel',
        last_name: 'Kane',
        number: 22,
        type: 'Sponsees',
        role: 'Admin',
        profile_picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        last_signed: '2 minutes ago'
      },
      { 
        id: 'ef488cf0-eae7-11e9-81b4-2a2ae2dbcce4',
        first_name: 'Lionel',
        last_name: 'Messi',
        number: 22,
        type: 'Sponsees',
        role: 'Admin',
        profile_picture: 'https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg',
        last_signed: 'Active: 10.07.19 @ 2pm'
      },
    ]
  }

  filterList = (text : string) => {
    if(text.length > 1)
      console.log(text)
    if(text.length == 0)
      this.refreshList()
  }

  refreshList = () => {
    console.log('refresh list')
  } 

  goToOthersProfile = (name : string) => {
    const { navigate } = this.props.navigation
    navigate('othersProfile', {name: name})
  }

  renderList = () => {
    const list = this.state.adminsList.map( p => {
      return (
        <ProfileCardComponent
          id = { p.id }
          first_name = { p.first_name }
          last_name ={ p.last_name }
          number = { p.number }
          type =  {p.type }
          role = { p.role }
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
            {this.renderList()}
            </Content>
          </Container>
        </Root>
      </PTRView>
    )
  }
}
