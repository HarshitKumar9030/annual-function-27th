import { Calendar, Clock, MapPin, Award, ChevronRight } from 'lucide-react'

export default function Invitation() {
  return (
    <section className="bg-purple-700 text-white p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">You&apos;re Invited!</h2>
      <p className="text-xl mb-6">Join us on November 30th, 2024, to experience these amazing projects in person!</p>
      <div className="space-y-4">
        <div className="flex items-center">
          <Calendar className="mr-2" />
          <span>Date: November 30th, 2024</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2" />
          <span>Venue: UCSKM Public School, Bhiwadi, Alwar (Raj.)</span>
        </div>
        <div className="flex items-center">
          <Award className="mr-2" />
          <span>Chance to win exciting prizes!</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <span>Special performances by our talented students</span>
        </div>
        <div className="flex items-center">
          <ChevronRight className="mr-2" />
          <span>Interactive workshops and demonstrations</span>
        </div>
      </div>
      <button className="mt-8 bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors transform hover:scale-105">
        RSVP Now
      </button>
    </section>
  )
}