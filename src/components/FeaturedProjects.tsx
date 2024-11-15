export default function FeaturedProjects() {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Featured Math Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-50 p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Number Sliding Puzzle & Stick Puzzle Challenge</h3>
            <p>Challenge your spatial reasoning and problem-solving skills with these two interactive puzzles. Arrange numbers in order and create five squares by removing just two sticks.</p>
            <p className="mt-2 text-sm text-purple-600">Created by Harshit and Abhishek from Class XI PCM</p>
          </div>
          <div className="bg-white bg-opacity-50 p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Math Challenge</h3>
            <p>Race against time to solve quick math problems! Improve your mental math skills with this exciting challenge. This web-exclusive game is designed to test your mathematical prowess and quick thinking abilities.</p>
          </div>
          <div className="bg-white bg-opacity-50 p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Mathematical Art Gallery</h3>
            <p>Explore the beauty of mathematics through art! This project showcases stunning visual representations of mathematical concepts, including fractals, geometric patterns, and number-based artworks.</p>
            <p className="mt-2 text-sm text-purple-600">Created by the UCSKM Art and Math Collaboration Team</p>
          </div>
        </div>
        <p className="mt-4 text-center text-purple-700">All projects were expertly guided by our esteemed teacher, Mr. Ramkrishan, showcasing the intersection of creativity and mathematical thinking.</p>
      </section>
    )
  }