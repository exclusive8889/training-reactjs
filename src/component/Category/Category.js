
import Task from "../Task/Task";

import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../stores/slice/taskSlice";
import { taskSelector } from "../../stores/selector";
import { searchTextSelector } from "../../stores/selector";

import styles from "./Category.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Category({ data }) {
  const dispatch = useDispatch();
  const [tasknname, setTaskname] = useState("");
  const [getidtask, setGetidtask] = useState("");
  const [btnupdate, setBtnupdate] = useState(false);

  const task = useSelector(taskSelector);
  const searchText=useSelector(searchTextSelector)
  
  const tasks=task?.filter((task)=>
      task.title.includes(searchText)
  )

  const handleAddtask = () => {
    dispatch(
      addTask({
        title: tasknname,
        categoryIds: [data.id],
      })
    );
    setTaskname("");
  };
  const handleChangeInput = (e) => {
    setTaskname(e.target.value);
  };
  const updaTask = (title, idcate, idtask) => {
    setGetidtask(idtask);
    setTaskname(title);
    setBtnupdate(!btnupdate);
    if (btnupdate) setTaskname("");
  };
  const handleUpdateTask = () => {
    dispatch(
      updateTask({
        title: tasknname,
        categoryIds: data.id,
        status: "IN_PROGRESS",
        idtask: getidtask,
      })
    );
    setTaskname("");
    setBtnupdate(!btnupdate);
  };
  return (
    <div className={cx("wrap")}>
      <div className={cx("category")}>
        <div className={cx("category-createDay")}>
          <input
            placeholder="add task"
            onChange={handleChangeInput}
            value={tasknname}
          ></input>
          {!btnupdate ? (
            <button onClick={handleAddtask}>Add</button>
          ) : (
            <button onClick={handleUpdateTask}>update</button>
          )}
        </div>
        <div className={cx("category-name")}>
              <p>{data.name}</p>
        </div>
        <div className={cx("category-task")}>
          {tasks?.map((task) =>
            task.categories.map(
              (idcate, index) =>
                idcate.id == data.id && (
                  <Task
                    key={index}
                    idcate={data.id}
                    title={task.title}
                    idtask={task.id}
                    status={task.status}
                    updateTask={updaTask}
                  />
                )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
