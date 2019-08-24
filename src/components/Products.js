import React from 'react';
import AppContext from '../context/AppContext';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,} from 'recharts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class Products extends React.Component {

  _handleProductClick = (product) => {
    this.props._setProduct(product)
    this.props._setView(2);
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
          <div className="Products" style={{margin: 3 + 'em'}}>
            <Paper >
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Costo de producción&nbsp;</TableCell>
                    <TableCell align="right">Precio de venta&nbsp;</TableCell>
                    <TableCell align="right">Descripción&nbsp;</TableCell>
                    <TableCell align="right">Stock&nbsp;</TableCell>
                    <TableCell align="right">Categoría&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.products.map(product => (
                    <TableRow hover key={product.product_id} onClick={() => this._handleProductClick(product)} style={{cursor: 'pointer'}}>
                      <TableCell component="th" scope="row">{product.product_name}</TableCell>
                      <TableCell align="right">${product.cost_price}</TableCell>
                      <TableCell align="right">${product.selling_price}</TableCell>
                      <TableCell align="right">{product.description}</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                      <TableCell align="right">{product.category_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            {/*<Paper style={{marginTop: 1 + 'em', display: 'flexbox', flexDirection: 'row'}}>
              <ProductsStatistics sales={this.props.sales}/>
                  </Paper>*/}
          </div>
      	)}
      </AppContext.Consumer>
    );
  }
}

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400, dmt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210, dmt: 2400,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290, dmt: 2400,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000, dmt: 2400,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181, dmt: 2400,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500, dmt: 2400,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100, dmt: 2400,
  },
];

class ProductsStatistics extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      data: [],
      year: 2019,
      january: [],
      february: [],
      march: [],
      april: [],
      may: [],
      june: [],
      july: [],
      august: [],
      september: [],
      october: [],
      november: [],
      december: []
    }
  }

  componentDidMount() {
    this._setData();
  }

  _setData = () => {
    let yearSales = this.props.sales.map(sale => {
      if(new Date(sale.sale_date).getFullYear() === this.state.year)
       return sale;
    });
    let january = [], february = [], march = [], april = [], may = [], june = [], july = [], august = [], september = [], october = [], november = [], december = [];
    yearSales.map(sale => {
      if(new Date(sale.sale_date).getMonth() === 0)
        january.push(sale);
      if(new Date(sale.sale_date).getMonth() === 1)
        february.push(sale);
      if(new Date(sale.sale_date).getMonth() === 2)
        march.push(sale);
      if(new Date(sale.sale_date).getMonth() === 3)
        april.push(sale);
      if(new Date(sale.sale_date).getMonth() === 4)
        may.push(sale);
      if(new Date(sale.sale_date).getMonth() === 5)
        june.push(sale);
      if(new Date(sale.sale_date).getMonth() === 6)
        july.push(sale);
      if(new Date(sale.sale_date).getMonth() === 7)
        august.push(sale);
      if(new Date(sale.sale_date).getMonth() === 8)
        september.push(sale);
      if(new Date(sale.sale_date).getMonth() === 9)
        october.push(sale);
      if(new Date(sale.sale_date).getMonth() === 10)
        november.push(sale);
      if(new Date(sale.sale_date).getMonth() === 11)
        december.push(sale);
    });
    
    this.setState({
      january,
      february,
      march,
      april,
      may,
      june: june,
      july,
      august,
      september,
      october,
      november,
      december
    });
  }

  _setProducts = () => {
    let products = this.props.producs
  }

  render() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#404040" fill="#515151" />
      </AreaChart>
    );
  }
}

export default Products;
