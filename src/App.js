import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Pages & Components
import About from "./component/about/About";
import LoginSign from "./component/Authentication/LoginSign";
import CourseDetailPage from "./component/Course/CourseDetailPage";
import CourseLessonView from "./component/Course/CourseLessonView";
import Favorites from "./component/Course/Favorites";
import MyPurchasedCourses from "./component/Course/MyPurchasedCourses";
import Payment from "./component/Course/Payment";
import PaymentSuccess from "./component/Course/PaymentSuccess";

import Home from "./component/Home/Home";
import productDetails from "./component/Products/ProductDetails";
import Products from "./component/Products/products";
import Search from "./component/Products/Search";

import EditProfile from "./component/user/EditProfile";
import ForgotPassword from "./component/user/ForgotPassword";
import MoreOption from "./component/user/MoreOption";
import Profile from "./component/user/Profile";
import ResetPassword from "./component/user/ResetPassword";
import UpdatePassword from "./component/user/UpdatePassword";

import AccountSettings from "./more/AccountSettings";
import CommingSoon from "./more/CommingSoon";
import Contact from "./more/Contact";
import LikedCourses from "./more/LikedCourses";
import Loading from "./more/Loader";
import Notfound from "./more/Notfound";
import Rules from "./more/Rules";
import Support from "./more/Support";
import UserData from "./more/UserData";

import ProtectedRoute from "./route/ProtectedRoute";

// ✅ Admin Pages
import AddCourse from "./component/admin/AddCourse";
import Category from "./component/admin/Category";
import Course from "./component/admin/Course";
import Dashboard from "./component/admin/Dashboard";
import EarningsDashboard from "./component/admin/EarningsDashboard";
import LessonManagement from "./component/admin/LessonManagement";
import QuizManagement from "./component/admin/QuizManagement";
import Users from "./component/admin/Users";

// ✅ Quiz Page
import AdminGlobalSettings from "./component/admin/AdminGlobalSettings";
import CollegeManagement from "./component/admin/manage_college/CollegeManagement";
import AdminNotifications from "./component/admin/Notifications";
import Quiz from "./component/Course/Quiz"; // 💡 Make sure this path is correct
import UserNotifications from "./component/notification/UserNotifications";
import ActivityLog from "./more/ActivityLog";
import CourseProgress from "./more/CourseProgress";
import QuizProgress from "./more/QuizProgress";
import AddCollege from "./component/admin/manage_college/AddCollege";
import EditCollege from "./component/admin/manage_college/EditCollege";
import CollegeCategoriesPrograms from "./component/admin/manage_college/CollegeCategoriesPrograms";
import College from "./component/information/Colleges";
import Colleges from "./component/information/Colleges";
import ProgramColleges from "./component/information/ProgramColleges";
import CategoryColleges from "./component/information/CategoryColleges";
import CollegeDetail from "./component/information/CollegeDetail";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);



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
        <Route exact path="/colleges" component={Colleges} />
        <Route exact path="/college-category/:slug" component={CategoryColleges} />
        <Route exact path="/college-program/:slug" component={ProgramColleges} />
        <Route exact path="/college/:slug" component={CollegeDetail} />




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

        <Route
          exact
          path="/notifications"
          component={UserNotifications}
        />


        {/* ✅ Course Routes */}
        <Route exact path="/course/:id" component={CourseDetailPage} />
        <ProtectedRoute
          exact
          path="/course/:id/learn"
          component={CourseLessonView}
        />

        {/* ✅ Quiz Route */}
        <ProtectedRoute exact path="/course/:id/quiz" component={Quiz} />
        <ProtectedRoute exact path="/me/quiz-progress" component={QuizProgress} />

        {/* ✅ Course progress Route */}

        <ProtectedRoute exact path="/me/course-progress" component={CourseProgress} isAdmin={false} />

        {/* ✅ Activity log Route */}

        <ProtectedRoute exact path="/activity" component={ActivityLog} isAdmin={false} />



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
        <ProtectedRoute
          exact
          path="/admin/lessonManagement"
          component={LessonManagement}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/quizManagement"
          component={QuizManagement}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/earnings"
          component={EarningsDashboard}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/offerSettings"
          component={AdminGlobalSettings}
          isAdmin={true}
        />

        <ProtectedRoute
          exact
          path="/admin/notifications"
          component={AdminNotifications}
          isAdmin={true}
        />

        <ProtectedRoute
          exact
          path="/admin/collegeManagement"
          component={CollegeManagement}
          isAdmin={true}
        />

        <ProtectedRoute
          exact
          path="/admin/addCollege"
          component={AddCollege}
          isAdmin={true}
        />

        <ProtectedRoute
          exact
          path="/admin/editCollege"
          component={EditCollege}
          isAdmin={true}
        />

        <ProtectedRoute
          exact
          path="/admin/collegeCategoriesPrograms"
          component={ CollegeCategoriesPrograms}
          isAdmin={true}
        />
 

        {/* ❌ 404 Not Found */}
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
