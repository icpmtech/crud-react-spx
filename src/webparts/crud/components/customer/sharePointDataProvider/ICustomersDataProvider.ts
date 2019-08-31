import { IWebPartContext } from '@microsoft/sp-webpart-base';
import {ICustomer}  from '../Models/ICustomer';
export interface ICustomersDataProvider {
  webPartContext: IWebPartContext;
    getItems(): Promise<ICustomer[]>;
    createItem(title: string): Promise<ICustomer[]>;
    updateItem(itemUpdated: ICustomer): Promise<ICustomer[]>;
    deleteItem(itemDeleted: ICustomer): Promise<ICustomer[]>;
  }
 