import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";

function Login() {

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <AuthCard

                title="User Login"

                subtitle="Student / Faculty"

            >

                <LoginForm />

            </AuthCard>

        </div>

    );

}

export default Login;