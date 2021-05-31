import React from 'react';
import './TableOfTasks.css';

import _ from 'lodash';

import { formatId } from '../../shared';

export default function TableOfTasks({
  tasks,
  priorities,
  statuses,
  shorten = false,
  onClick = () => {},
}) {
  const shortHeadersJSX = (
    <>
      <th>
        <div />
      </th>
      <th>
        <div>ID</div>
      </th>
      <th>
        <div>Название</div>
      </th>
    </>
  );

  const otherHeadersJSX = (
    <>
      <th>
        <div>Статус</div>
      </th>
      <th>
        <div>Исполнитель</div>
      </th>
    </>
  );

  const getShortColumnsJSX = (task) => {
    const priorityRgb = _.find(
      priorities,
      (p) => p.id === task.priorityId
    )?.rgb;

    return (
      <>
        <td>
          <div
            className="TableOfTasks-priority"
            style={{
              background: priorityRgb,
            }}
          />
        </td>
        <td className="TableOfTasks-id">{formatId(task.id)}</td>
        <td>
          <div className="TableOfTasks-name">{task.name}</div>
        </td>
      </>
    );
  };

  const getOtherColumnsJSX = (task) => {
    const statusRgb = _.find(statuses, (p) => p.id === task.statusId)?.rgb;

    return (
      <>
        <td>
          <div
            className="TableOfTasks-status"
            style={{
              background: statusRgb,
              color: statusRgb && '#fff',
            }}
          >
            {task.statusName}
          </div>
        </td>
        <td>{task.executorName}</td>
      </>
    );
  };

  return (
    <div className="TableOfTasks">
      <table>
        <thead>
          <tr>
            {shortHeadersJSX}
            {!shorten && otherHeadersJSX}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id} onClick={() => onClick(task.id)}>
                {getShortColumnsJSX(task)}
                {!shorten && getOtherColumnsJSX(task)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}