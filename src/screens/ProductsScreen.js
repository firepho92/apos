import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import Products from '../components/Products';
import NewProduct from '../components/NewProduct';
import Product from '../components/Product';
import ProductsControl from '../components/ProductsControl';
import StockAdd from '../components/StockAdd';
import AppContext from '../context/AppContext';
import axios from 'axios';

const customButton = (props) => {
    const buttonOnMouseClick = () => {
      props.onClick()
    }

    return (
      <CommandBarButton
        {...props}
        onClick={buttonOnMouseClick}
        styles={{
          ...props.styles,
          textContainer: { fontSize: 18 },
          icon: { color: '#0078d4' }
        }}
      />
    );
  };

class ProductsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 0,
      product: null,
    }
  }

  _setView = (view) => {
    this.setState({
      view
    })
  }

  _setProduct = (product) => {
    this.setState({
      product
    })
  }

  getItems = () => {
    return [
      {
        key: 'products',
        name: 'Productos',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Product'
        },
        ariaLabel: 'Productos',
        onClick: () => this._setView(0)
      },
      {
        key: 'new',
        name: 'Nuevo',
        iconProps: {
          iconName: 'Add'
        },
        onClick: () => this._setView(1)
      },
      {
        key: 'control',
        name: 'Control',
        iconProps: {
          iconName: 'Diagnostic'
        },
        onClick: () => this._setView(3)
      },
      {
        key: 'agregar',
        name: 'Agregar',
        iconProps: {
          iconName: 'Add'
        },
        onClick: () => this._setView(4)
      },
    ];
  };

    render() {
    return (
      <AppContext.Consumer>
      	{context => (
          <div className="CustomersScreen">
            <CommandBar
              overflowButtonProps={{
                ariaLabel: 'More commands',
                menuProps: {
                  items: [], // Items must be passed for typesafety, but commandBar will determine items rendered in overflow
                  isBeakVisible: true,
                  beakWidth: 20,
                  gapSpace: 10,
                  directionalHint: DirectionalHint.topCenter
                }
              }}
              buttonAs={customButton}
              items={this.getItems()}
              ariaLabel={'Use left and right arrow keys to navigate between commands'}
            />
            { this.state.view === 0 ? <Products _setView={this._setView} _setProduct={this._setProduct} products={this.state.products} filteredProducts={this.state.filteredProducts} sales={context.state.sales}/> : null }
            { this.state.view === 1 ? <NewProduct _setView={this._setView} _setProducts={this._setProducts} _contextSetProducts={context._setProducts}/> : null }
            { this.state.view === 2 ? <Product _setView={this._setView} product={this.state.product} _setProducts={this._setProducts} sales={context.state.sales.filter(sale => sale.product === this.state.product.product_id)}/> : null }
            { this.state.view === 3 ? <ProductsControl _showAlert={context._showAlert} customers={context.state.customers} products={context.state.products}/> : null }
            { this.state.view === 4 ? <StockAdd _showAlert={context._showAlert} customers={context.state.customers} products={context.state.products}/> : null }
          </div>          
      	)}
      </AppContext.Consumer>
    );
  }
  
}

export default ProductsScreen;
