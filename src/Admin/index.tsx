import React, { FC } from "react";
import { useAppSelector } from "../store/hooks";

export const Admin: FC = React.memo(() => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <>
            <main className="profile-page pt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{ transform: "translateZ(0px)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200 mt-32">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {user.name} {user.surname}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Los Angeles, California
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        Solution Manager - Creative Tim Officer
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        University of Computer Science
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                An artist of considerable range,{" "}
                                                {user.name} the name taken by
                                                Melbourne-raised, Brooklyn-based
                                                Nick Murphy writes, performs and
                                                records all of his own music,
                                                giving it a warm, intimate feel
                                                with a solid groove structure.
                                                An artist of considerable range.
                                            </p>
                                            <a
                                                href="#pablo"
                                                className="font-normal text-blue-500"
                                            >
                                                Show more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                    <div className="text-sm text-white font-semibold py-1">
                                        Made with{" "}
                                        <a
                                            href="https://www.creative-tim.com/product/notus-js"
                                            className="text-blueGray-500 hover:text-gray-800"
                                            target="_blank"
                                        >
                                            Notus JS
                                        </a>{" "}
                                        by{" "}
                                        <a
                                            href="https://www.creative-tim.com"
                                            className="text-blueGray-500 hover:text-blueGray-800"
                                            target="_blank"
                                        >
                                            {" "}
                                            Creative Tim
                                        </a>
                                        .
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    );
});
