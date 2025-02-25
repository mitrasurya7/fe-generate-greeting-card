import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <section className="w-full lg:m-5 m-0 rounded-lg shadow-lg h-full lg:p-5 p-2 bg-gray-50  ">
            {children}
        </section>
    );
}

export default Card