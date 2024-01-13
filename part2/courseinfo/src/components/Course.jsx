const Header = ({ name }) => 
  <h2>{name}</h2>

const Part = ({ part }) => 
  <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  parts.map(part => <Part key={part.id} part={part} />)

const Total = ({parts}) => {
  let total = parts.map(part => part.exercises).reduce((acc, val) => acc + val)
  return (
    <>
      <p><strong>Total of {total} exercises</strong></p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

export default Course