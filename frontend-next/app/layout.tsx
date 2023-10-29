import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata: Metadata = {
    title: "RASI",
    description: "RASI web app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body>
                <header>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                RASI
                            </a>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="appointment"
                                    >
                                        Pedir Citas Médicas
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="medicaments">
                                        Medicamentos
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                {children}
                <BootstrapClient></BootstrapClient>
            </body>
        </html>
    );
}
