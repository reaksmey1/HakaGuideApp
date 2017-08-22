import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Content, 
          Button, 
          Text, 
          Form, 
          Item, 
          Input, 
          Label, 
          Grid, 
          Row,
          Spinner
        } from 'native-base';
class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({email, password});
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button block style={styles.loginBtn} onPress={this.onButtonPress.bind(this)}>
        <Text style={styles.loginTxt}>Sign In</Text>
      </Button>
    );
  }

  render() {
    return (
      <Content>
        <Grid>
          <Row style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.thumbnailStyles} source={{ uri: 'https://pbs.twimg.com/profile_images/459528509212213248/XgEeCgRA_400x400.jpeg' }} />
          </Row>
        </Grid>
        <Form style={{ height: 250, width: 350, alignSelf: 'center' }}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect={false}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </Item>

          <Text style={styles.errorText}> { this.props.error } </Text>

          {this.renderButton()}

        </Form>
      </Content>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

//  return {
//    email: state.auth.email,
//    password: state.auth.password,
//    error: state.auth.error
//  };

const styles = {
  loginBtn: {
    marginTop: 15
  },

  loginTxt: {
    color: '#fff'
  },

  thumbnailStyles: {
    width: 200,
    height: 200,
    marginTop: 40
  },

  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 5
  }
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
