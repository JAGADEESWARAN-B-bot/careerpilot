import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, Plus, Check } from 'lucide-react';
import { SkillTag } from '../components/StatusNotice';

interface ProfilePageProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onSaveProfile }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...userProfile });
  const [newSkill, setNewSkill] = useState('');
  const [newRole, setNewRole] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const suggestedSkills = [
    'PyTorch', 'LangChain', 'Docker', 'FastAPI', 'React', 'PostgreSQL',
    'ChromaDB', 'Kubernetes', 'TypeScript', 'Redis', 'GraphQL', 'AWS'
  ];

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !formData.technicalSkills.includes(trimmed)) {
      setFormData({
        ...formData,
        technicalSkills: [...formData.technicalSkills, trimmed],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      technicalSkills: formData.technicalSkills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddRole = (roleToAdd: string) => {
    const trimmed = roleToAdd.trim();
    if (trimmed && !formData.preferredRoles.includes(trimmed)) {
      setFormData({
        ...formData,
        preferredRoles: [...formData.preferredRoles, trimmed],
      });
      setNewRole('');
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setFormData({
      ...formData,
      preferredRoles: formData.preferredRoles.filter((r) => r !== roleToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic & Technical Profile</h1>
        <p className="text-sm text-slate-500">
          Manage your credentials, academic program, and technical skill set factored into live job matching.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800">
          <Check className="h-4 w-4" />
          <span>Profile changes successfully saved to your browser session & database layer!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Academic Credentials Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Education & Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Degree Program
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Department / Specialization
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Graduation Year
              </label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2026 })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              >
                <option value="Final-Year Student / Entry-Level">Final-Year Student / Entry-Level</option>
                <option value="Fresher / Recent Graduate">Fresher / Recent Graduate</option>
                <option value="Junior (1-2 years experience)">Junior (1-2 years experience)</option>
                <option value="Internship Seeking">Internship Seeking</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Professional Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Technical Competencies Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Technical Skills ({formData.technicalSkills.length})
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g., PyTorch, FastAPI, Docker)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(newSkill);
                }
              }}
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddSkill(newSkill)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-900 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="text-xs font-semibold text-slate-500">Quick additions for B.Sc CS (AI & DS):</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {suggestedSkills
                .filter((s) => !formData.technicalSkills.includes(s))
                .slice(0, 8)
                .map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
                  >
                    + {skill}
                  </button>
                ))}
            </div>
          </div>

          {/* Active Skills Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.technicalSkills.map((skill) => (
              <SkillTag
                key={skill}
                skill={skill}
                onRemove={() => handleRemoveSkill(skill)}
              />
            ))}
          </div>
        </div>

        {/* Target Roles Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Target Job Roles
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. AI Engineer, Data Scientist, ML Engineer..."
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRole(newRole);
                }
              }}
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddRole(newRole)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-900 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {formData.preferredRoles.map((role) => (
              <SkillTag
                key={role}
                skill={role}
                onRemove={() => handleRemoveRole(role)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-800 transition"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
