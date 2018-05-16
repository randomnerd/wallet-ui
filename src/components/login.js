import React, {Component} from 'react';
import {Grid, Header, Segment, Form, Button} from 'semantic-ui-react';
import {compose} from 'recompose';
import {inject, observer} from "mobx-react/index";

class LoginForm extends Component {
    saveKeys() {
        const {api, router} = this.props.root;
        localStorage.setItem('api.url', api.url);
        localStorage.setItem('api.pubkey', api.pubkey);
        localStorage.setItem('api.privkey', api.privkey);
        router.push('/');
    }

    handleChange(e, {name, value}) {
        this.props.root.api[name] = value;
    }

    render() {
        const {root} = this.props;
        return (
            <div className='login-form'>
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 550 }}>
                        <Header as='h2' color='blue' textAlign='center'>
                            Auth params
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name='url'
                                    value={root.api.url}
                                    onChange={this.handleChange.bind(this)}
                                    icon='globe'
                                    iconPosition='left'
                                    placeholder='http://localhost:8080/api'
                                />
                                <Form.Input
                                    fluid
                                    name='pubkey'
                                    value={root.api.pubkey}
                                    onChange={this.handleChange.bind(this)}
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='API Key'
                                />
                                <Form.Input
                                    fluid
                                    name='privkey'
                                    value={root.api.privkey}
                                    onChange={this.handleChange.bind(this)}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='API Secret Key'
                                    type='password'
                                />

                                <Button color='blue' fluid size='large' onClick={this.saveKeys.bind(this)}>Save</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default compose(
    inject('root'),
    observer
)(LoginForm);
