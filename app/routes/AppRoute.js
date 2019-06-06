import React from 'react';
import { Route } from 'react-router-dom';

export default ({ component: Component, layout: Layout, ...rest }) => (
  <Route

    { ...rest }
    render={ function ( props ) {

      return (
        <Layout { ...rest.layoutProps } >
          <Component
            { ...props }
            { ...rest.props }
          />
        </Layout>
      );

    }}

  />
);
