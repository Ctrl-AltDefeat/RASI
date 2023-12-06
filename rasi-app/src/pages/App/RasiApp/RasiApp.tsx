import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    MedicineBoxOutlined

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Layout, Menu} from 'antd';
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";


import Appointments from "../Appointments/Appointments";
import Medicaments  from "../Medicaments/Medicaments";
import HistoriaClinicaForm from "../HistoriaClinica/HistoriaClinicaForm";
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem;
}


const titulos: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
    getItem('Citas', 'citas', <UserOutlined />),
    getItem('Medicamentos', 'medicamentos', <MedicineBoxOutlined />),
    getItem('Historias', 'historias', <DesktopOutlined />),

];


function RasiApp() {

    return (
        <>
            <div className={"App"}>
        <Layout style={{ minHeight: '100vh', backgroundColor:'#282c34'}}>

            <SideMenu />

            <Layout style={{backgroundColor:'#748c92'}}>

                <Content style={{ margin: '0 30px'}}>
                    <Contenido/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2023 Created by Pablo Junco</Footer>
            </Layout>
        </Layout>
            </div>

        </>
    );
}

function SideMenu(){
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return(<Sider style={{backgroundColor:'#282c34'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{backgroundColor:'#282c34', display:"flex"}}
             className="demo-logo-vertical" />
        <Menu onClick={({key}) =>{
            if(key !== "9") navigate(key);
        }}
              theme="dark"
              style={{backgroundColor:'#282c34'}}
              defaultSelectedKeys={[window.location.pathname]}
              mode="inline"
              items={titulos} />

    </Sider>)
}

function Contenido(){
    return(<div>
        <Routes>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="citas" element={<Appointments/>} />
            <Route path="medicamentos" element={<Medicaments/>} />
            <Route path="historias" element={<HistoriaClinicaForm/>} />
        </Routes>
    </div>);
}

export default RasiApp;
