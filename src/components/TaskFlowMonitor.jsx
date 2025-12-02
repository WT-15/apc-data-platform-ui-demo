// TaskFlowMonitor.jsx - 任务流监控界面
import React, { useState } from 'react';
import { Card, Table, Progress, Tag, Timeline, Steps, Space, Statistic, Row, Col } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TaskFlowMonitor = () => {
  const [tasks] = useState([
    { id: 'T001', name: 'EQP数据实时采集', type: 'STREAMING', status: 'running', progress: 85, duration: '2h 30m', dataType: 'EQP_PROCESS', throughput: '5.2 MB/s' },
    { id: 'T002', name: '量测数据批处理', type: 'BATCH', status: 'success', progress: 100, duration: '45m', dataType: 'MEASURE_DATA', throughput: '12.8 MB/s' },
    { id: 'T003', name: '数据质量校验', type: 'QUALITY', status: 'warning', progress: 70, duration: '1h 15m', dataType: 'ALL', issues: 3 },
    { id: 'T004', name: 'APC模型训练', type: 'ML', status: 'pending', progress: 0, estimatedDuration: '4h', dataType: 'HISTORICAL_DATA' }
  ]);

  const performanceData = [
    { time: '08:00', cpu: 45, memory: 60, tasks: 12 },
    { time: '09:00', cpu: 52, memory: 65, tasks: 15 },
    { time: '10:00', cpu: 48, memory: 62, tasks: 14 },
    { time: '11:00', cpu: 55, memory: 68, tasks: 18 },
    { time: '12:00', cpu: 50, memory: 63, tasks: 16 },
    { time: '13:00', cpu: 47, memory: 61, tasks: 13 },
    { time: '14:00', cpu: 53, memory: 66, tasks: 17 }
  ];

  const taskStatusConfig = {
    running: { color: 'blue', icon: <SyncOutlined spin />, text: '运行中' },
    success: { color: 'green', icon: <CheckCircleOutlined />, text: '成功' },
    warning: { color: 'orange', icon: <ClockCircleOutlined />, text: '警告' },
    pending: { color: 'gray', icon: <ClockCircleOutlined />, text: '等待' }
  };

  const columns = [
    { title: '任务名称', dataIndex: 'name', key: 'name' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => {
        const config = taskStatusConfig[status];
        return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
      }
    },
    { 
      title: '进度', 
      key: 'progress',
      render: (_, record) => (
        <Progress 
          percent={record.progress} 
          status={record.status === 'running' ? 'active' : 'success'}
          size="small"
          style={{ width: 150 }}
        />
      )
    },
    { title: '数据类型', dataIndex: 'dataType', key: 'dataType' },
    { title: '吞吐量/问题', key: 'metrics', render: (_, record) => record.throughput || `${record.issues}个问题` }
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="ETL任务监控">
            <Table columns={columns} dataSource={tasks} rowKey="id" pagination={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="系统性能">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU%" />
                <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="内存%" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="数据流状态">
            <Steps direction="vertical" current={2}>
              <Steps.Step title="数据采集" description="从设备/系统收集原始数据" status="finish" />
              <Steps.Step title="数据清洗" description="去噪、格式化、标准化" status="finish" />
              <Steps.Step title="数据关联" description="关联Lot/Wafer/Recipe" status="process" />
              <Steps.Step title="特征工程" description="提取工艺特征" status="wait" />
              <Steps.Step title="APC建模" description="训练控制模型" status="wait" />
            </Steps>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="任务时间线">
            <Timeline>
              <Timeline.Item color="green">08:00 EQP数据开始采集</Timeline.Item>
              <Timeline.Item color="green">08:15 量测数据处理完成</Timeline.Item>
              <Timeline.Item color="blue">08:30 实时数据清洗进行中</Timeline.Item>
              <Timeline.Item color="gray">10:00 计划进行APC模型训练</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={6}><Card><Statistic title="今日数据总量" value={245.7} suffix="GB" /></Card></Col>
        <Col span={6}><Card><Statistic title="活跃数据源" value={12} suffix="个" /></Card></Col>
        <Col span={6}><Card><Statistic title="数据延迟" value={2.3} suffix="秒" /></Card></Col>
        <Col span={6}><Card><Statistic title="任务成功率" value={98.5} suffix="%" /></Card></Col>
      </Row>
    </div>
  );
};

export default TaskFlowMonitor;