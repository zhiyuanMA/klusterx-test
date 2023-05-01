import React from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Team, teams } from "./data/api";
import Fixtures from "./components/fixtures";

const App: React.FC = () => {
  const columns: ColumnsType<Team> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="link">{text}</Button>,
    },
    {
      title: "Played",
      dataIndex: "played",
      key: "played",
    },
    {
      title: "Won",
      dataIndex: "won",
      key: "won",
    },
    {
      title: "Drawn",
      dataIndex: "drawn",
      key: "drawn",
    },
    {
      title: "Lost",
      dataIndex: "lost",
      key: "lost",
    },
    {
      title: "GD",
      dataIndex: "gd",
      key: "gd",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      render: (text) => <b>{text}</b>,
    },
  ];

  return (
    <>
      <Table
        pagination={false}
        expandable={{
          expandedRowRender: (record) => <Fixtures name={record.name} data={record.fixtures} />,
          expandRowByClick: true,
          expandIcon: () => <></>,
        }}
        columns={columns}
        dataSource={teams}
      />
    </>
  );
};

export default App;
