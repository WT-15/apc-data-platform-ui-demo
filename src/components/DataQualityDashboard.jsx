// DataQualityDashboard.jsx - 数据质量监控
import React from 'react';
import { Card, Row, Col, Progress, List, Statistic, Tag } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DataQualityDashboard = () => {
  const qualityTrendData = [
    { date: '01-08', EQP_PROCESS: 98.5, MEASURE_DATA: 96.2, LOT_PROCESS: 99.1 },
    { date: '01-09', EQP_PROCESS: 98.8, MEASURE_DATA: 95.8, LOT_PROCESS: 99.3 },
    { date: '01-10', EQP_PROCESS: 97.9, MEASURE_DATA: 96.5, LOT_PROCESS: 98.9 },
    { date: '01-11', EQP_PROCESS: 99.2, MEASURE_DATA: 97.1, LOT_PROCESS: 99.5 },
    { date: '01-12', EQP_PROCESS: 98.6, MEASURE_DATA: 96.8, LOT_PROCESS: 99.2 },
    { date: '01-13', EQP_PROCESS: 99.0, MEASURE_DATA: 97.3, LOT_PROCESS: 99.4 },
    { date: '01-14', EQP_PROCESS: 98.3, MEASURE_DATA: 96.0, LOT_PROCESS: 98.8 }
  ];

  const completenessData = [
    { name: 'EQP_PROCESS', value: 99.5, total: '5M', missing: '25K' },
    { name: 'EQP_STATUS', value: 99.8, total: '120K', missing: '240' },
    { name: 'MEASURE_DATA', value: 98.7, total: '250K', missing: '3.2K' },
    { name: 'LOT_PROCESS', value: 99.9, total: '5K', missing: '5' }
  ];

  const issueStats = [
    { type: '数据缺失', count: 12, severity: 'medium', dataType: 'EQP_STATUS' },
    { type: '数据异常', count: 8, severity: 'high', dataType: 'MEASURE_DATA' },
    { type: '格式错误', count: 3, severity: 'low', dataType: 'RECIPE_LIST' },
    { type: '延迟超时', count: 5, severity: 'medium', dataType: 'EQP_PROCESS' }
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="数据质量趋势">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[95, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="EQP_PROCESS" stroke="#1890ff" strokeWidth={2} name="设备工艺数据" />
                <Line type="monotone" dataKey="MEASURE_DATA" stroke="#52c41a" strokeWidth={2} name="量测数据" />
                <Line type="monotone" dataKey="LOT_PROCESS" stroke="#722ed1" strokeWidth={2} name="批次工艺数据" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="数据完整性统计">
            <List
              dataSource={completenessData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.name}</span>
                        <span style={{ fontWeight: 'bold', color: item.value >= 99 ? '#52c41a' : '#faad14' }}>
                          {item.value}%
                        </span>
                      </div>
                    }
                    description={
                      <div>
                        <Progress percent={item.value} status="normal" size="small" />
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                          总计: {item.total} 条 | 缺失: {item.missing} 条
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="数据问题告警">
            <List
              dataSource={issueStats}
              renderItem={(item) => (
                <List.Item>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: item.severity === 'high' ? '#f5222d' : item.severity === 'medium' ? '#faad14' : '#52c41a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    marginRight: '12px'
                  }}>
                    {item.count}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.type}</span>
                      <Tag color={getDataTypeColor(item.dataType)}>{item.dataType}</Tag>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      严重程度: <span style={{ 
                        color: item.severity === 'high' ? '#f5222d' : item.severity === 'medium' ? '#faad14' : '#52c41a',
                        fontWeight: 'bold'
                      }}>
                        {item.severity === 'high' ? '高' : item.severity === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={6}><Card><Statistic title="数据延迟(平均)" value={2.3} suffix="秒" valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="数据可用率" value={99.2} suffix="%" /></Card></Col>
        <Col span={6}><Card><Statistic title="今日问题数" value={8} valueStyle={{ color: '#faad14' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="自动修复率" value={75} suffix="%" valueStyle={{ color: '#52c41a' }} /></Card></Col>
      </Row>
    </div>
  );
};

const getDataTypeColor = (dataType) => {
  const colors = { EQP_PROCESS: 'blue', EQP_STATUS: 'green', MEASURE_DATA: 'red', LOT_PROCESS: 'orange' };
  return colors[dataType] || 'default';
};

export default DataQualityDashboard;