import {useState, useEffect} from 'react';
import styles from './app.module.css';

const AppLayout = ({todoList, isLoading}) => {
  return (
    <div className={styles.app}>
      <h1>To-do list</h1>
      {isLoading ?
        <div className={styles.spinner}></div>
        :
        <ul className={styles['todo-list']}>
          {todoList.map(listItem => <li className={styles['todo-list__item']} key={listItem.id}>{listItem.title}</li>)}
        </ul>
      }
    </div>
  )
};

export const AppContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((loadedData) => loadedData.json())
      .then((list) => {
          setTodoList(list);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return <AppLayout todoList={todoList} isLoading={isLoading} />;
};
