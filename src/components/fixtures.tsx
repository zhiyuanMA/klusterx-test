import { Avatar, List } from "antd";
import React, { memo } from "react";
import { Game } from "../data/api";
import { format } from "date-fns";
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";

export interface Props {
  name: string;
  data: Game[];
}

const dateFormat = "dd/MM HH:mm";
const generateIcon = (
  isHome: boolean,
  homeGoals: number,
  guestGoals: number
) => {
  if (
    (isHome && homeGoals > guestGoals) ||
    (!isHome && homeGoals < guestGoals)
  ) {
    return <CheckCircleTwoTone twoToneColor="#52c41a" />;
  }
  if (homeGoals === guestGoals) {
    return <MinusCircleTwoTone twoToneColor="#9978f5f8" />;
  }
  if (
    (isHome && homeGoals < guestGoals) ||
    (!isHome && homeGoals > guestGoals)
  ) {
    return <CloseCircleTwoTone twoToneColor="#fc0707" />;
  }
};

const Fixtures: React.FC<Props> = ({ name, data }) => {
  return (
    <List
      size={"small"}
      dataSource={data}
      renderItem={(item: Game) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${
                  Math.round(Math.random() * 100)
                }`}
              />
            }
            title={
              <a>
                {format(item.date, dateFormat)}{" "}
                {item.played ? (
                  generateIcon(
                    name === item.home,
                    item.homeGoals ? item.homeGoals : 0,
                    item.guestGoals ? item.guestGoals : 0
                  )
                ) : (
                  <ClockCircleOutlined
                    style={{ fontSize: "14px", color: "#079afc" }}
                  />
                )}
              </a>
            }
            description={
              <p>
                {item.home}{" "}
                <b>
                  {item.homeGoals} VS {item.guestGoals}
                </b>{" "}
                {item.guest}
              </p>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default memo(Fixtures);
