import React from 'react';

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>);
};

const Part = (props) => {
  console.log('Part components props: ', props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>);
};

const Content = (props) => {
  const rows = () => {
    return props.parts.map(part => <Part key={part.id} part={part} />);
  };

  return (
    <div>
      {rows()}
    </div>);
};

const Total = ({ parts }) => {

  const number = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (<p>
    <b>
      Total number of exercises {number}
    </b>
  </p>);
};

export const Course = ({ course }) => {

  console.log('course is like this now', course);

  return (<div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>);
};

// export default Course