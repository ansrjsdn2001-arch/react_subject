import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  const [subjectList, setSubjectList] = useState([]); //검색 결과 리스트

  const [searchKeyword, setSearchKeyword] = useState(""); //검색에서 사용
  const [keyword, setKeyword] = useState(""); //입력용

  //서버에 넘겨줄 데이터(쿼리 조건문 작성 시 필요. 엑시오스 작성 때 넘겨줄 것)
  const [category, setCategory] = useState(0); //과목 분류 0. 모든 과목1. 백앤드 2. 프론트앤드 3. DB
  const [level, setLevel] = useState(0); //과목 난이도 1. 초급 2. 중급 3. 고급
  const [order, setOrder] = useState(1); //정렬 기준 1. 작성순 2.난이도 오름차순 3. 난이도 내림차순 4. 수강인원 오름차순 5. 수강인원 내림차순
  //선택조건 없을 시 기본값은 작성순

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/search?keyword=${searchKeyword}&category=${category}&level=${level}&order=${order}`,
      )
      .then((res) => {
        console.log(res);
        setSubjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchKeyword, category, level, order]);

  return (
    <div className={styles.subject_wrap}>
      <header className={styles.header}>
        <h1>강의 목록</h1>
      </header>

      <div className={styles.search_wrap}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchKeyword(keyword); //실제 검색어
            setKeyword(""); //검색창 비움
          }}
          className={styles.input_wrap}
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          ></input>
          <button className={styles.search_btn} type="submit">
            검색
          </button>
        </form>

        <div className={styles.filter_wrap}>
          <select
            className={styles.category_select}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value={0}>전체</option>
            <option value={1}>백앤드</option>
            <option value={2}>프론트앤드</option>
            <option value={3}>DB</option>
          </select>
          <select
            className={styles.level_select}
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <option value={0}>전체</option>
            <option value={1}>초급</option>
            <option value={2}>중급</option>
            <option value={3}>고급</option>
          </select>
          <select
            className={styles.order_select}
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value={1}>작성순</option>
            <option value={2}>난이도 오름차순</option>
            <option value={3}>난이도 내림차순</option>
            <option value={4}>수강인원 오름차순</option>
            <option value={5}>수강인원 내림차순</option>
          </select>
        </div>
      </div>
      <div className={styles.subject_list_wrap}>
        <ul className={`${styles.ul_list} ${styles.ul_title}`}>
          <li className={styles.subject_no}>번호</li>
          <li className={styles.subject_title}>과목명</li>
          <li className={styles.subject_instructor}>담당 강사</li>
          <li className={styles.subject_category}>과목 분류</li>
          <li className={styles.subject_level}>과목 난이도</li>
          <li className={styles.subject_count}>수강 인원</li>
        </ul>
        {subjectList.map((subject) => {
          return (
            <ul className={styles.ul_list} key={"subject-" + subject.subjectNo}>
              <li className={styles.subject_no}>{subject.subjectNo}</li>
              <li className={styles.subject_title}>{subject.subjectTitle}</li>
              <li className={styles.subject_instructor}>
                {subject.subjectInstructor}
              </li>
              <li className={styles.subject_category}>
                {subject.subjectCategory === 1
                  ? "백앤드"
                  : subject.subjectCategory === 2
                    ? "프론트앤드"
                    : subject.subjectCategory === 3
                      ? "DB"
                      : "전체"}
              </li>
              <li className={styles.subject_level}>
                {subject.subjectLevel === 1
                  ? "초급"
                  : subject.subjectLevel === 2
                    ? "중급"
                    : subject.subjectLevel === 3
                      ? "고급"
                      : "전체"}
              </li>
              <li className={styles.subject_count}>{subject.subjectCount}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;
