import { useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  location: string;
}

interface NotificationSettings {
  wateringReminders: boolean;
  weeklySummary: boolean;
  careTips: boolean;
}

interface ToggleRowProps {
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleRow = ({ title, subtitle, checked, onChange }: ToggleRowProps) => (
  <div className="toggle-row">
    <div>
      <div className="t-title">{title}</div>
      <div className="t-sub">{subtitle}</div>
    </div>
    <div
      className={`switch${checked ? " on" : ""}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onChange();
      }}
    ></div>
  </div>
);

const Settings = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "Riya Sharma",
    email: "riya@example.com",
    location: "Bālāchor, Punjab",
  });
  const [savedMessage, setSavedMessage] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    wateringReminders: true,
    weeklySummary: true,
    careTips: false,
  });

  const updateField = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    setSavedMessage(false);
  };

  const toggle = (field: keyof NotificationSettings) => () => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // wire this up to your real API call
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="page" id="page-settings">
      <div className="topbar">
        <div className="greet">
          <h2>Settings</h2>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      <div className="settings-card">
        <h4>Profile</h4>
        <div className="field">
          <label>Name</label>
          <input type="text" value={profile.name} onChange={updateField("name")} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="text" value={profile.email} onChange={updateField("email")} />
        </div>
        <div className="field">
          <label>Location</label>
          <input type="text" value={profile.location} onChange={updateField("location")} />
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>
          {savedMessage ? "Saved ✓" : "Save changes"}
        </button>
      </div>

      <div className="settings-card">
        <h4>Notifications</h4>
        <ToggleRow
          title="Watering reminders"
          subtitle="Get notified when a plant needs water"
          checked={notifications.wateringReminders}
          onChange={toggle("wateringReminders")}
        />
        <ToggleRow
          title="Weekly summary"
          subtitle="A digest of your plants' health every Monday"
          checked={notifications.weeklySummary}
          onChange={toggle("weeklySummary")}
        />
        <ToggleRow
          title="Care tips"
          subtitle="Occasional seasonal care suggestions"
          checked={notifications.careTips}
          onChange={toggle("careTips")}
        />
      </div>
    </div>
  );
};

export default Settings;
