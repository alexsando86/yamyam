import { useState, useEffect, useCallback } from "react";
import View from "./components/View";

export function App(props) {
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [count, setCount] = useState("");
	const [posts, setPosts] = useState([]);
	const [totalCount, setTotalCount] = useState();

	// post api
	const postData = async (url = "", data = {}) => {
		const reponse = await fetch(url, {
			method: "POST",
			cache: "no-cache",
			mode: "cors",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return await reponse.json();
	};

	// get api
	const getFetchAPI = useCallback(async () => {
    const response = await fetch("http://localhost:4000/posts", {
      method: "GET",
      mode: "cors",
      cache: "default",
    })
      .then((response) => response.json())
      .then((response) => response);
			setPosts(response);
			const countArray = response.map(item => Number(item.count));
			const reducer = countArray.reduce((prev,now) => prev + now, 0);
			setTotalCount(reducer);
  },[])
	
	// delete
	const fetchDelete = async (id) => {
		const reponse = await fetch(`http://localhost:4000/posts/${id ?? ""}`, {
			method: "DELETE",
			cache: "no-cache",
			mode: "cors",
		});
		await getFetchAPI();
	};
	
	// reset input
	const resetInput = () => {
		setMonth('');
		setDay('');
		setCount('');
	}
	
	// update
	const onSubmit = async (e) => {
		e.preventDefault();
    await postData("http://localhost:4000/posts", { month, day, count });
    await getFetchAPI();
		// getCount()
		resetInput();
	};

  useEffect(async () => {
		await getFetchAPI();
		console.log(totalCount)
  }, [totalCount]);

	return (
		<>
			<h1>알콩달콩얌얌 {totalCount > 0 && <span className="total">{`총${totalCount}개`}</span>}</h1>
			<form action="post" className="flexBox" onSubmit={onSubmit}>
				<input type="tel" value={month} placeholder="월" onChange={(e) => setMonth(e.target.value)} />
				<input type="tel" value={day} placeholder="일" onChange={(e) => setDay(e.target.value)} />
				<input type="tel" value={count} placeholder="갯수" onChange={(e) => setCount(e.target.value)} />
				<button type="submit">
					입력
				</button>
			</form>

			<View posts={posts} fetchDelete={fetchDelete} />
		</>
	);
}
