export default function MathInDailyLife() {
    const mathApplications = [
      "Budgeting and personal finance",
      "Cooking and baking (measuring ingredients)",
      "Time management and scheduling",
      "Home improvement and DIY projects",
      "Sports statistics and performance analysis",
      "Technology and computer science",
    ]
  
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Math in Daily Life</h2>
        <p className="mb-4">Discover how mathematics plays a crucial role in our everyday lives:</p>
        <ul className="list-none space-y-2 bg-white bg-opacity-50 p-4 rounded-lg">
          {mathApplications.map((application, index) => (
            <li
              key={index}
              className="flex items-center transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="text-purple-600 mr-2">▲</span>
              {application}
            </li>
          ))}
        </ul>
        <p className="mt-4">At UCSKM, we believe in nurturing mathematical thinking that extends beyond the classroom, preparing our students for real-world challenges and opportunities.</p>
      </section>
    )
  }