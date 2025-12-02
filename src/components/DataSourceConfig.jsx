// DataSourceConfig.jsx - 数据源配置界面
import React, { useState } from 'react';
import { Card, Table, Tag, Button, Space, Statistic, Row, Col, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DataSourceConfig = () => {
  const [dataSources, setDataSources] = useState([
    { id: 'DS001', name: '蚀刻机-ETCH01', type: 'EQP_PROCESS', protocol: 'SECS/GEM', status: 'active', ip: '192.168.1.101' },
    { id: 'DS002', name: '量测机-METRO01', type: 'MEASURE_DATA', protocol: 'EAP', status: 'active', ip: '192.168.1.102' },
    { id: 'DS003', name: 'CVD设备-CVD01', type: 'EQP_PROCESS', protocol: 'SECS/GEM', status: 'active', ip: '192.168.1.103' },
    { id: 'DS004', name: '光刻机-PHOTO01', type: 'EQP_STATUS', protocol: 'EAP', status: 'inactive', ip: '192.168.1.104' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dataSourceTypes = {
    EQP_PROCESS: { label: '设备工艺数据', color: 'blue' },
    EQP_STATUS: { label: '设备状态数据', color: 'green' },
    MEASURE_DATA: { label: '量测数据', color: 'red' },
    LOT_PROCESS: { label: '批次工艺数据', color: 'orange' }
  };

  const columns = [
    { title: '数据源名称', dataIndex: 'name', key: 'name' },
    { 
      title: '数据类型', 
      dataIndex: 'type', 
      key: 'type',
      render: (type) => {
        const typeInfo = dataSourceTypes[type];
        return <Tag color={typeInfo?.color}>{typeInfo?.label}</Tag>;
      }
    },
    { title: '协议', dataIndex: 'protocol', key: 'protocol' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? '运行中' : '已停用'}
        </Tag>
      )
    },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
    {
      title: '操作',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">编辑</Button>
          <Button size="small" type="text" danger>删除</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic title="总数据源" value={dataSources.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="活跃数据源" value={dataSources.filter(ds => ds.status === 'active').length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="今日数据量" value={245.7} suffix="GB" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="数据延迟" value={2.3} suffix="秒" />
          </Card>
        </Col>
      </Row>

      <Card 
        title="数据源列表" 
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加数据源
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSources}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal 
        title="添加数据源" 
        open={isModalVisible} 
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="数据源名称" required>
            <Input placeholder="例如：蚀刻机-ETCH01" />
          </Form.Item>
          <Form.Item label="数据类型" required>
            <Select placeholder="请选择数据类型">
              {Object.entries(dataSourceTypes).map(([value, info]) => (
                <Select.Option key={value} value={value}>
                  <Tag color={info.color}>{info.label}</Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="协议类型" required>
            <Select placeholder="请选择协议">
              <Select.Option value="SECS/GEM">SECS/GEM</Select.Option>
              <Select.Option value="EAP">EAP</Select.Option>
              <Select.Option value="OPC-UA">OPC-UA</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="IP地址" required>
            <Input placeholder="例如：192.168.1.101" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block>保存</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataSourceConfig;