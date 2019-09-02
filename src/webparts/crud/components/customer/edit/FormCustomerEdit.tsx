import * as React from 'react';
import { IFormCustomerEditState } from './IFormCustomerEditState';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType,
  MessageBarButton,
  Panel,
  PanelType,
  PrimaryButton,
  Link
} from 'office-ui-fabric-react';
import { CustomersDataProvider } from '../sharePointDataProvider/CustomersDataProvider';
import { ICustomer } from '../Models/ICustomer';
export default class FormCustomerEdit extends React.Component<{}, IFormCustomerEditState> {
  private _customersDataProvider:CustomersDataProvider;
  private _showEditCustomerPanel=false;
 
  constructor(props){
    super(props);
    this._showEditCustomerPanel=props.state.showEditCustomerPanel;
    this._customersDataProvider=new CustomersDataProvider({});
    this.state = {
      isBusy: false,
      customer: props.state.selectedCustomer,
      customersDataProvider: this._customersDataProvider,
      messageSended: false,
      showEditCustomerPanel:props.state.showEditCustomerPanel,
      _goBack:props.state._goBack,
    };
  }
 
  public render(): React.ReactElement<{}> {
    return (
      <div>
              <TextField disabled={this.state.isBusy} label="Customer Name"  name="text" value={this.state.customer.name} onChange={this._onChange} />
              <PrimaryButton disabled={this.state.isBusy } onClick={this._UpdateCustomer}>Save</PrimaryButton>
              <DefaultButton disabled={!this.state.isBusy } onClick={this.state._goBack} >Cancel</DefaultButton>
             
      </div>
    );
  }
 
 
  private _onChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    
    let value= event.target.value;
    const {customer}=   this.state;
    customer.name=value;
    this.setState({customer:customer});
    
  }

  private _UpdateCustomer = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) : Promise<void> => {
   
    const {customer}=   this.state;
    this.setState({isBusy:true});
    this._customersDataProvider.updateItem(customer).then((customers: ICustomer[]) => {
      console.log("Updated:"+customer);
      
    });
    this.state._goBack();
}
}

