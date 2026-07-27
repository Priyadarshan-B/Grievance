function AuthCard({ title, subtitle, children }) {

    return (

        <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

            <h1 className="text-3xl font-bold text-center">
                {title}
            </h1>

            <p className="text-gray-500 text-center mt-2 mb-8">
                {subtitle}
            </p>

            {children}

        </div>

    );

}

export default AuthCard;