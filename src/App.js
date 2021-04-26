import React, { useState, useEffect } from "react";
import SearchBar from "./component/searchbar";
import AddNewWordModal from "./component/newWordModal";
import Card from "./component/Card";
import axios from "./axios";
import Page404 from "./component/page404";
import "./App.css";

function App() {
  const [isloaded, setloaded] = useState(false);
  const [allCachedWords, setCachedWords] = useState([]);
  const [isError, setError] = useState(false);
  const [searchQurey, setsearchQurey] = useState("");

  useEffect(() => {
    axios({ url: "/", method: "GET" })
      .then((data) => {
        setCachedWords(data.data);
        setloaded(true);
      })
      .catch((err) => {
        setError(true);
        setloaded(true);
      });
  }, []); //ON LOAD GETTING CACHED WORDS FROM DB

  function getSearchQuery(searchterm) {
    setsearchQurey(searchterm.toLowerCase());
  }

  const lengthFilterwords = allCachedWords.filter((elem) => {
    if (searchQurey === "") {
      return elem;
    }
    return elem.word.includes(searchQurey);
  }).length; //FILTER WORDS ARRAY LENGTH

  const filterWords = allCachedWords.filter((elem) => {
    if (searchQurey === "") {
      return elem;
    }
    return elem.word.includes(searchQurey);
  }); //FILTER WORDS ARRAY

  return (
    <>
      {isloaded ? (
        <div className="App">
          {isError ? (
            <Page404 />
          ) : (
            <>
              <SearchBar getSearchQuery={getSearchQuery} />
              {lengthFilterwords ? (
                filterWords.map((elem, i) => {
                  return <Card key={i} word={elem} />;
                })
              ) : (
                <h2 className="noWordWarning">No word found !</h2>
              )}
              <AddNewWordModal />
            </>
          )}
        </div>
      ) : null}
    </>
  );
}
export default App;
