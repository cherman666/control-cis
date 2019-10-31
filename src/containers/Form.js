import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Form.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class Form extends Component {
    state = {
       data: {
            sitio: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Sitio'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },           
            sl: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Solicitud de Logistica N°'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },           
            fechaPreparacion: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Fecha de Preparacion'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },           
            fechaControl: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Fecha de Control'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },           
            jp: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Jefe de Proyecto'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            itemAgregado: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Item Agregado'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            causa: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Causa'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            codigo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Codigo'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            itemSustraido: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Item Sustraido'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            causa2: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Causa'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            codigo2: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Codigo'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },                                                                             
            preparo: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'kevin', displayValue: 'Kevin'},
                        {value: 'saturnino', displayValue: 'Saturnino'},
                        {value: 'alexander', displayValue: 'Alexander'},
                        {value: 'santiago', displayValue: 'Santiago'},
                        {value: 'mario', displayValue: 'Mario'},
                        {value: 'gabriel', displayValue: 'Gabriel'}
                    ]
                },
                value: 'kevin',
                validation: {},
                valid: true
            },           
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData ={};
        for (let formElementIdentifier in this.state.data) {
            formData[formElementIdentifier] = this.state.data[formElementIdentifier].value;
        }
        
        const planilla = {
            planillaData: formData,
            userId: this.props.userId            
        }

        this.props.onFinishControl(planilla, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.data[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.data[inputIdentifier].validation),
            touched: true
        }); 

        const updatedData = updateObject(this.state.data, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedData) {
            formIsValid = updatedData[inputIdentifier].valid && formIsValid;
        }

        this.setState({data: updatedData, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.data) {
            formElementsArray.push({
                id: key,
                config: this.state.data[key]
            });
        }
        let formulario = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Control Cis Group</h4>
                {formulario}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Form, axios));