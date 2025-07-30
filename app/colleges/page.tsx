import { fetchCollegesFromSheet } from '@/lib/fetchColleges';

export default async function CollegesPage() {
  const colleges = await fetchCollegesFromSheet();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Colleges</h1>
      <ul className="grid gap-4">
        {colleges.map((college, index) => (
          <li key={index} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p>{college.state} • {college.type} • {college.size} students</p>
            <p>Acceptance Rate: {college.acceptanceRate}%</p>
            <p>Avg GPA: {college.avgGPA} | Avg SAT: {college.avgSAT}</p>
            <p>Tuition: ${college.tuition}</p>
            <a
              href={college.link}
              target="_blank"
              className="text-blue-600 underline"
            >
              Visit Website
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
