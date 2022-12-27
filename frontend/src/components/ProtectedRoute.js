import {Route, Redirect} from "react-router-dom";

export default function ProtectedRoute({component: Component, ...props}) {
   return (
      <Route exact={props.exact} path={props.path}>
         {props.isAuth ? <Component {...props} /> : <Redirect to="/sign-in"/>}
      </Route>
   )
}