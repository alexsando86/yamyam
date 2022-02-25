import React, { useEffect, useState, useCallback } from "react";

const View = ({ posts, fetchDelete }) => {

	return (
		<ul className="list">
			{posts?.map((item) => {
				const { month, day, count, id } = item;
				return (
					<li>
						<span>
							{month}월 {day}일
						</span>
						<div>
							<em>{count}개</em>
							<button type="button" onClick={() => fetchDelete(id)}>
								삭제
							</button>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default View;
