// src/components/DataFlowDesigner.jsx
import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// 自定义节点组件
const DataSourceNode = ({ data }) => (
  <div style={{
    padding: '10px 15px',
    borderRadius: '5px',
    background: data.color || '#fff',
    border: `2px solid ${data.borderColor || '#333'}`,
    minWidth: '150px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative'
  }}>
    <Handle type="source" position={Position.Right} style={{ top: '50%' }} />
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{data.label}</div>
    <div style={{ fontSize: '12px', color: '#666' }}>{data.type}</div>
    {data.stats && (
      <div style={{ fontSize: '10px', marginTop: '5px' }}>📊 {data.stats}</div>
    )}
  </div>
);

const ProcessingNode = ({ data }) => (
  <div style={{
    padding: '10px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    minWidth: '120px',
    textAlign: 'center',
    position: 'relative'
  }}>
    <Handle type="target" position={Position.Left} style={{ top: '50%' }} />
    <Handle type="source" position={Position.Right} style={{ top: '50%' }} />
    <div style={{ fontSize: '14px' }}>{data.label}</div>
    <div style={{ fontSize: '10px', opacity: 0.9 }}>{data.desc}</div>
  </div>
);

const DataLakeNode = ({ data }) => (
  <div style={{
    padding: '10px 15px',
    borderRadius: '5px',
    background: data.color || '#fff',
    border: `2px solid ${data.borderColor || '#333'}`,
    minWidth: '150px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative'
  }}>
    <Handle type="target" position={Position.Left} style={{ top: '50%' }} />
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{data.label}</div>
    <div style={{ fontSize: '12px', color: '#666' }}>{data.type}</div>
    {data.stats && (
      <div style={{ fontSize: '10px', marginTop: '5px' }}>📊 {data.stats}</div>
    )}
  </div>
);

// 初始节点数据
const initialNodes = [
  {
    id: '1',
    type: 'dataSource',
    position: { x: 50, y: 50 },
    data: {
      label: '蚀刻机实时数据',
      type: 'EQP_PROCESS_DATA',
      color: '#e3f2fd',
      borderColor: '#2196f3',
      stats: '100Hz, 2.5GB/day'
    },
  },
  {
    id: '2',
    type: 'dataSource',
    position: { x: 50, y: 150 },
    data: {
      label: '设备状态监控',
      type: 'EQP_STATUS_DATA',
      color: '#e8f5e9',
      borderColor: '#4caf50',
      stats: '事件触发'
    },
  },
  {
    id: '3',
    type: 'dataSource',
    position: { x: 50, y: 250 },
    data: {
      label: '量测结果数据',
      type: 'MEASURE_DATA',
      color: '#ffebee',
      borderColor: '#f44336',
      stats: '批次触发, 500MB/day'
    },
  },
  {
    id: '4',
    type: 'processing',
    position: { x: 250, y: 100 },
    data: { label: '数据清洗', desc: '去噪、异常值检测' },
  },
  {
    id: '5',
    type: 'processing',
    position: { x: 450, y: 100 },
    data: { label: '特征提取', desc: '提取关键工艺特征' },
  },
  {
    id: '6',
    type: 'processing',
    position: { x: 650, y: 100 },
    data: { label: '数据关联', desc: '关联Lot/Wafer/Recipe' },
  },
  {
    id: '7',
    type: 'dataLake',
    position: { x: 850, y: 100 },
    data: {
      label: 'APC流式数据湖',
      type: 'Apache Paimon',
      color: '#f3e5f5',
      borderColor: '#9c27b0',
      stats: '流批一体 · 实时更新 · 低延迟'
    },
  },
];

// 初始边数据
const initialEdges = [
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    animated: true,
    label: '实时流',
    style: { stroke: '#2196f3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196f3' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    label: '事件流',
    style: { stroke: '#4caf50', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#4caf50' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    label: '批处理',
    style: { stroke: '#f44336', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f44336' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2 },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2 },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2 },
  },
];

const DataFlowDesigner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 关键修复：使用useMemo记忆化nodeTypes，避免错误#002
  const nodeTypes = useMemo(() => ({
    dataSource: DataSourceNode,
    processing: ProcessingNode,
    dataLake: DataLakeNode,
  }), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div>
      <div style={{
        width: '100%',
        height: '500px', // 修复错误#004：设置明确高度
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        marginBottom: '20px',
        backgroundColor: 'white'
      }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </div>

      <div style={{ 
        padding: '15px', 
        background: '#f5f5f5', 
        borderRadius: '6px',
        border: '1px solid #e8e8e8'
      }}>
        <h4 style={{ marginTop: 0, marginBottom: '10px' }}>数据流说明:</h4>
        <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong style={{ color: '#2196f3' }}>蓝色箭头</strong>: 高频实时数据流 (EQP_PROCESS_DATA)</li>
          <li><strong style={{ color: '#4caf50' }}>绿色箭头</strong>: 事件驱动数据流 (EQP_STATUS_DATA)</li>
          <li><strong style={{ color: '#f44336' }}>红色箭头</strong>: 批处理数据流 (MEASURE_DATA)</li>
          <li><strong>交互提示</strong>: 可从节点右侧连接点拖拽到左侧连接点创建新连线</li>
        </ul>
      </div>
    </div>
  );
};

export default DataFlowDesigner;