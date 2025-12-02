// App.jsx - 主应用框架 (已修复布局宽度问题)
import React, { useState } from 'react';
import { Layout, Menu, theme, Tabs, Avatar } from 'antd';
import { 
  DatabaseOutlined, 
  LineChartOutlined, 
  DeploymentUnitOutlined, 
  DashboardOutlined, 
  SettingOutlined 
} from '@ant-design/icons';
import { ReactFlowProvider } from 'reactflow';

import DataSourceConfig from './components/DataSourceConfig';
import DataFlowDesigner from './components/DataFlowDesigner';
import TaskFlowMonitor from './components/TaskFlowMonitor';
import DataLineageView from './components/DataLineageView';
import DataQualityDashboard from './components/DataQualityDashboard';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [activeTab, setActiveTab] = useState('1');
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const tabItems = [
    {
      key: '1',
      label: '数据源管理',
      icon: <DatabaseOutlined />,
      children: <DataSourceConfig />
    },
    {
      key: '2',
      label: '数据流设计',
      icon: <DeploymentUnitOutlined />,
      children: (
        <ReactFlowProvider>
          <DataFlowDesigner />
        </ReactFlowProvider>
      )
    },
    {
      key: '3',
      label: '任务流监控',
      icon: <LineChartOutlined />,
      children: <TaskFlowMonitor />
    },
    {
      key: '4',
      label: '数据血缘',
      icon: <DashboardOutlined />,
      children: <DataLineageView />
    },
    {
      key: '5',
      label: '质量监控',
      icon: <SettingOutlined />,
      children: <DataQualityDashboard />
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* 左侧导航栏 */}
      <Sider 
        theme="dark" 
        width={250}
        style={{ 
          overflow: 'auto',
          position: 'sticky',
          top: 0,
          left: 0,
          height: '100vh'
        }}
      >
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#001529'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar size="large" style={{ backgroundColor: '#1890ff' }}>APC</Avatar>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>半导体APC数据平台</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>v2.0.0</div>
            </div>
          </div>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          items={tabItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label
          }))}
          onClick={({ key }) => setActiveTab(key)}
        />
      </Sider>

      {/* 右侧主内容区 */}
      <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header style={{ 
          background: colorBgContainer, 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <h2 style={{ margin: 0 }}>
            {tabItems.find(t => t.key === activeTab)?.label}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>欢迎回来，半导体工程师</span>
            <Avatar>SE</Avatar>
          </div>
        </Header>

        <Content style={{ 
          flex: 1, 
          margin: '24px', 
          minWidth: 0,
          overflow: 'auto'
        }}>
          <div style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
            minHeight: '100%',
            width: '100%'
          }}>
            <Tabs
              activeKey={activeTab}
              items={tabItems.map(item => ({
                key: item.key,
                children: item.children,
                label: item.label
              }))}
              renderTabBar={() => null}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;