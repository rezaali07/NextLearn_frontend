import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { loadUser } from "./actions/UserActions";
import "./App.css";

// Pages & Components
import About from "./component/about/About";
import LoginSign from "./component/Authentication/LoginSign";
import Favorites from "./component/Course/Favorites";
import Payment from "./component/Course/Payment";
import PaymentSuccess from "./component/Course/PaymentSuccess";
import CourseDetailPage from "./component/Course/CourseDetailPage";
import CourseLessonView from "./component/Course/CourseLessonView";
import MyPurchasedCourses from "./component/Course/MyPurchasedCourses";

import Home from "./component/Home/Home";
import Products from "./component/Products/products";
import productDetails from "./component/Products/ProductDetails";
import Search from "./component/Products/Search";

import EditProfile from "./component/user/EditProfile";
import ForgotPassword from "./component/user/ForgotPassword";
import MoreOption from "./component/user/MoreOption";
import Profile from "./component/user/Profile";
import ResetPassword from "./component/user/ResetPassword";
import UpdatePassword from "./component/user/UpdatePassword";

import CommingSoon from "./more/CommingSoon";
import Contact from "./more/Contact";
import Loading from "./more/Loader";
import Notfound from "./more/Notfound";
import Rules from "./more/Rules";
import Support from "./more/Support";
import UserData from "./more/UserData";
import AccountSettings from "./more/AccountSettings";
import LikedCourses from "./more/LikedCourses";

import ProtectedRoute from "./route/ProtectedRoute";
import Store from "./Store";

// ✅ Admin Pages
import Dashboard from "./component/admin/Dashboard";
import Users from "./component/admin/Users";
import Category from "./component/admin/Category";
import Course from "./component/admin/Course";
import AddCourse from "./component/admin/AddCourse";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}

      <Switch>
        {/* ✅ Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={productDetails} />
        <Route exact path="/load" component={Loading} />
        <Route exact path="/login" component={LoginSign} />
        <Route exact path="/about" component={About} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/more" component={MoreOption} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/faq" component={Rules} />
        <Route exact path="/creator" component={CommingSoon} />

        {/* ✅ eSewa Payment Routes */}
        <Route exact path="/payment/:id" component={Payment} />
        <Route
          exact
          path="/payment/success/:transactionId"
          component={PaymentSuccess}
        />
        <Route
          exact
          path="/payment/failure"
          component={() => <h2>❌ Payment Failed</h2>}
        />

        {/* ✅ Course Routes */}
        <Route exact path="/course/:id" component={CourseDetailPage} />
        <ProtectedRoute
          exact
          path="/course/:id/learn"
          component={CourseLessonView}
        />

        {/* ✅ Account Routes */}
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route
          exact
          path="/password/reset/:token"
          component={ResetPassword}
        />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute
          exact
          path="/me/update/profile"
          component={EditProfile}
        />
        <ProtectedRoute exact path="/settings" component={AccountSettings} />
        <ProtectedRoute exact path="/favorites" component={Favorites} />
        <ProtectedRoute exact path="/me/liked" component={LikedCourses} />
        <ProtectedRoute
          exact
          path="/me/purchased"
          component={MyPurchasedCourses}
        />

        {/* ✅ Admin Routes */}
        <ProtectedRoute
          exact
          path="/admin/dashboard"
          component={Dashboard}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          component={Users}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/categories"
          component={Category}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/courses"
          component={Course}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/addCourse"
          component={AddCourse}
          isAdmin={true}
        />

        {/* ❌ 404 Not Found */}
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
