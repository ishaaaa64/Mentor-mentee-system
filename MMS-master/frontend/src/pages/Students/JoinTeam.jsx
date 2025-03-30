import React, { useContext, useEffect, useRef, useState } from 'react'
import { CardContainer, Section, SectionTitle, StudentDashboardContainer } from '../../styles/DashboardStyles'
import Sidebar from './Sidebar'
import { Content } from '../../styles/AnnouncementStyles'
import { FormContainer, InputField, SubmitButton } from '../../styles/TeacherSignInStyles'
import contexts from '../../components/ContextApi'

export default function JoinTeam() {
	let { ContextDetails } = useContext(contexts)

	const [Link, setLink] = useState('')
	const [SubmitBtn, SetSubmitBtn] = useState('Join')
	let [teams, setTeams] = useState([])
	const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

	const fetchTeams = async () => {
		let studentId = ContextDetails.StudentId
		let email = ContextDetails.StudentEmail
        if (!email || !studentId) {
            alert('Please enter both Email and Student ID');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:4000/api/team/get-matching-teams/${email}/${studentId}`);
            
            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'No matching teams found');
                setTeams([]);
            } else {
                const data = await response.json();
                setTeams(data.teams);
                console.log("Teams:", data.teams);
            }
        } catch (error) {
            setError('Error fetching teams: ' + error.message);
            setTeams([]);
        } finally {
            setLoading(false);
        }
    };


	const handleSignIn = async (e) => {
		e.preventDefault();
		let teamId = Link.split("join-team/")[1]

		let studentId = ContextDetails.StudentId
		let email = ContextDetails.StudentEmail
		if (!Link) {
			alert('Please fill in all required fields');
			return;
		}

		try {
			const body = { studentId, email}

			SetSubmitBtn("loading...")
			const response = await fetch(`http://localhost:4000/api/team/join-team/${teamId}`,{
				method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
			}
			);

			const data = await response.json();

			if (response.ok) {
				alert(data.message || 'Join in successfully!');
				SetSubmitBtn("Join")


			} else {
				SetSubmitBtn("Join")
				alert(data.message || 'Failed to Join');
			}
		} catch (error) {
			alert('Error occurred: ' + error.message);
			SetSubmitBtn("Join")
		}
	};

	useEffect(()=>{
		fetchTeams()
	},[])
	return (
		<div>
			<StudentDashboardContainer>
				<Sidebar />
				<Content>
					<Section >
						<div style={{ display: "flex", justifyContent: "center" }}>
							<FormContainer onSubmit={handleSignIn}>
								<h1>Join Team</h1>


								{/* Common Fields */}
								<InputField style={{ width: "95%" }}
									type="text"
									placeholder="Enter Join Link"
									value={Link}
									onChange={(e) => setLink(e.target.value)}
									required
								/>
								<SubmitButton as="button"  type="submit">{SubmitBtn}</SubmitButton>

							</FormContainer></div>
					</Section>
					{/* <Section> */}
					{/* <SectionTitle>Upcoming Events</SectionTitle> */}
					{/* Add a calendar or list of upcoming events */}
					{/* </Section> */}

					{/* Add more sections for other parts of the admin dashboard */}
					<Section>
                        <SectionTitle>Matching Teams</SectionTitle>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <CardContainer>
                            {teams.length > 0 ? (
                                teams.map((team, index) => {
									console.log(team)
									
									return(
										<a href='#' id={team._id}>
                                    <div key={index}   style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px' }}>
                                        <h3>{team.teamName}</h3>
                                        <p>Leader: {team.leaderEmail}</p>
                                        <p>Members: {team.members.length}</p>
                                        <ul>
                                            {team.members.map((member, idx) => (
                                                <li key={idx}>
                                                    {member.name} - {member.email}
                                                </li>
                                            ))}
                                        </ul>
                                    </div></a>
                                )})
                            ) : (
                                !loading && <p>No teams found.</p>
                            )}
                        </CardContainer>
                    </Section>

				</Content>
			</StudentDashboardContainer>
		</div>
	)
}

