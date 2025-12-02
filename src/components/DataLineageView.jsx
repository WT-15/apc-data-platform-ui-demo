// DataLineageView.jsx - 数据血缘关系可视化
import React, { useState } from 'react';
import { Card, Tree, Table, Descriptions, Tag, Row, Col } from 'antd';

const DataLineageView = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const lineageData = [
    {
      key: 'root',
      title: 'APC控制决策',
      type: 'OUTPUT',
      children: [
        {
          key: 'model',
          title: 'APC预测模型',
          type: 'ML_MODEL',
          children: [
            {
              key: 'features',
              title: '工艺特征数据',
              type: 'FEATURE_SET',
              children: [
                { key: 'eqp_process', title: '设备工艺数据', type: 'RAW_DATA', source: 'ETCH01' },
                { key: 'measure', title: '量测数据', type: 'RAW_DATA', source: 'CDSEM01' },
                { key: 'recipe', title: '配方参数', type: 'REFERENCE_DATA', source: 'MES' }
              ]
            },
            { key: 'historical', title: '历史训练数据', type: 'TRAINING_DATA', volume: '1.2TB' }
          ]
        },
        {
          key: 'rules',
          title: '控制规则库',
          type: 'BUSINESS_RULES',
          children: [
            { key: 'sop', title: '标准操作流程', type: 'PROCESS_LIST', source: 'SOP系统' },
            { key: 'limits', title: '工艺窗口限制', type: 'PARAM_DATA', source: '工艺规范' }
          ]
        }
      ]
    }
  ];

  const columns = [
    { title: '字段', dataIndex: 'field', key: 'field' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '来源', dataIndex: 'source', key: 'source' },
    { title: '示例值', dataIndex: 'example', key: 'example' },
    { title: '质量', key: 'quality', render: () => <Tag color="success">良好</Tag> }
  ];

  const fieldData = [
    { field: 'timestamp', type: 'datetime', source: '设备日志', example: '2024-01-15T08:00:00Z' },
    { field: 'equipment_id', type: 'string', source: '设备注册', example: 'ETCH01' },
    { field: 'chamber_temperature', type: 'float', source: '温度传感器', example: '150.5 °C' },
    { field: 'process_step', type: 'string', source: 'Recipe解析', example: 'MAIN_ETCH' }
  ];

  const getTypeColor = (type) => {
    const colors = { RAW_DATA: 'blue', REFERENCE_DATA: 'green', FEATURE_SET: 'orange', ML_MODEL: 'purple' };
    return colors[type] || 'default';
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="数据血缘关系">
          <Tree
            showLine
            defaultExpandedKeys={['root', 'model', 'features']}
            treeData={lineageData}
            titleRender={(nodeData) => (
              <div onClick={() => setSelectedNode(nodeData)} style={{ cursor: 'pointer', padding: '4px 0' }}>
                <Tag color={getTypeColor(nodeData.type)}>{nodeData.type}</Tag>
                <span style={{ marginLeft: 8 }}>{nodeData.title}</span>
                {nodeData.volume && <span style={{ fontSize: '12px', color: '#666', marginLeft: 8 }}>({nodeData.volume})</span>}
              </div>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title={selectedNode ? `详情 - ${selectedNode.title}` : '选择节点查看详情'}>
          {selectedNode ? (
            <>
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="数据类型">{selectedNode.type}</Descriptions.Item>
                <Descriptions.Item label="数据源">{selectedNode.source || '多源聚合'}</Descriptions.Item>
                {selectedNode.volume && <Descriptions.Item label="数据量">{selectedNode.volume}</Descriptions.Item>}
              </Descriptions>
              <h4 style={{ marginTop: 20 }}>字段结构:</h4>
              <Table columns={columns} dataSource={fieldData} size="small" pagination={false} />
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              点击左侧树节点查看数据详情
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default DataLineageView;